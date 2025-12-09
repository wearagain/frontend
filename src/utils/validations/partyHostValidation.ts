/**
 * 전화번호 형식 검증 (010-XXXX-XXXX 또는 01012345678)
 */
export const isValidPhone = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length === 11 && digitsOnly.startsWith("010")) {
    return true;
  }
  return /^010-\d{4}-\d{4}$/.test(phone);
};

/**
 * 이메일 형식 검증
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * 사업자번호 형식 검증 (XXX-XX-XXXXX)
 */
export const isValidTaxId = (taxId: string): boolean => {
  return /^\d{3}-\d{2}-\d{5}$/.test(taxId);
};

// ============ Step2 - 주최자 정보 검증 ============
export interface Step2Errors {
  name?: string;
  groupName?: string;
  phone?: string;
  email?: string;
}

export const validateStep2 = (
  data: {
    isGroup: boolean;
    name: string;
    groupName: string;
    phone: string;
    email: string;
  },
  touched?: { name?: boolean; groupName?: boolean; phone?: boolean; email?: boolean }
): Step2Errors => {
  const errors: Step2Errors = {};

  if (touched?.name !== false && !data.name.trim()) {
    errors.name = "주최자 이름을 입력해주세요.";
  }

  if (data.isGroup && touched?.groupName !== false && !data.groupName.trim()) {
    errors.groupName = "단체명을 입력해주세요.";
  }

  if (touched?.phone !== false) {
    if (!data.phone.trim()) {
      errors.phone = "전화번호를 입력해주세요.";
    } else if (!isValidPhone(data.phone)) {
      errors.phone = "11자리를 입력해주세요.";
    }
  }

  if (touched?.email !== false) {
    if (!data.email.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!isValidEmail(data.email)) {
      errors.email = "이메일 형식이 올바르지 않습니다.";
    }
  }

  return errors;
};

// ============ Step3 - 파티 정보 검증 ============
export interface Step3Errors {
  openAt?: string;
  closeAt?: string;
  address?: string;
  maxAttendeeCnt?: string;
  maxChangeCnt?: string;
}

export const validateStep3 = (
  data: {
    openAt: string;
    closeAt: string;
    address: string;
    maxAttendeeCnt: string;
    maxChangeCnt: string;
  },
  touched?: {
    openAt?: boolean;
    closeAt?: boolean;
    address?: boolean;
    maxAttendeeCnt?: boolean;
    maxChangeCnt?: boolean;
  }
): Step3Errors => {
  const errors: Step3Errors = {};

  const now = new Date();
  const openDate = new Date(data.openAt);
  const closeDate = new Date(data.closeAt);

  if (touched?.openAt !== false && data.openAt) {
    if (openDate <= now) {
      errors.openAt = "시작일은 현재 시간 이후여야 합니다.";
    }
  }

  if (touched?.closeAt !== false && data.closeAt && data.openAt) {
    if (closeDate <= openDate) {
      errors.closeAt = "종료일은 시작일 이후여야 합니다.";
    }
  }

  if (touched?.address !== false && !data.address.trim()) {
    errors.address = "파티 장소를 입력해주세요.";
  }

  if (touched?.maxAttendeeCnt !== false) {
    const cnt = Number(data.maxAttendeeCnt);
    if (!data.maxAttendeeCnt || cnt < 1) {
      errors.maxAttendeeCnt = "1명 이상 입력해주세요.";
    }
  }

  if (touched?.maxChangeCnt !== false) {
    const cnt = Number(data.maxChangeCnt);
    if (!data.maxChangeCnt || cnt < 1) {
      errors.maxChangeCnt = "1벌 이상 입력해주세요.";
    }
  }

  return errors;
};

// ============ Step4 - 배송 정보 검증 ============
export interface Step4Errors {
  address?: string;
  desiredDate?: string;
  taxId?: string;
  taxEmail?: string;
}

export const validateStep4 = (
  data: {
    address: string;
    desiredDate: string;
    taxReceipt: boolean;
    taxId: string;
    taxEmail: string;
  },
  touched?: {
    address?: boolean;
    desiredDate?: boolean;
    taxId?: boolean;
    taxEmail?: boolean;
  }
): Step4Errors => {
  const errors: Step4Errors = {};

  if (touched?.address !== false && !data.address.trim()) {
    errors.address = "배송 주소를 입력해주세요.";
  }

  if (touched?.desiredDate !== false && !data.desiredDate) {
    errors.desiredDate = "희망 배송일을 선택해주세요.";
  }

  if (data.taxReceipt) {
    if (touched?.taxId !== false) {
      if (!data.taxId.trim()) {
        errors.taxId = "사업자번호를 입력해주세요.";
      } else if (!isValidTaxId(data.taxId)) {
        errors.taxId = "10자리를 입력해주세요.";
      }
    }

    if (touched?.taxEmail !== false) {
      if (!data.taxEmail.trim()) {
        errors.taxEmail = "이메일을 입력해주세요.";
      } else if (!isValidEmail(data.taxEmail)) {
        errors.taxEmail = "이메일 형식이 올바르지 않습니다. (example@wearagain.com)";
      }
    }
  }

  return errors;
};

// ============ Step5 - 최종 검증 (전체) ============
interface PartyHostData {
  isGroup: boolean;
  groupName: string;
  name: string;
  phone: string;
  email: string;
  openAt: string;
  closeAt: string;
  address: string;
  maxChangeCnt: number;
  maxAttendeeCnt: number;
  partyTitle: string;
  deliverAddress: string;
  desiredDate: string;
  taxReceipt: boolean;
  taxEmail: string;
  taxId: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const partyHostValidation = (data: PartyHostData): ValidationResult => {
  const errors: string[] = [];

  // 주최자 정보
  if (!data.name.trim()) errors.push("주최자 이름을 입력해주세요.");
  if (!data.phone.trim()) {
    errors.push("전화번호를 입력해주세요.");
  } else if (!isValidPhone(data.phone)) {
    errors.push("전화번호 형식이 올바르지 않습니다.");
  }
  if (!data.email.trim()) {
    errors.push("이메일을 입력해주세요.");
  } else if (!isValidEmail(data.email)) {
    errors.push("이메일 형식이 올바르지 않습니다.");
  }
  if (data.isGroup && !data.groupName.trim()) {
    errors.push("단체명을 입력해주세요.");
  }

  // 파티 정보
  if (!data.partyTitle.trim()) errors.push("파티 제목을 입력해주세요.");
  if (!data.address.trim()) errors.push("파티 장소를 입력해주세요.");

  const now = new Date();
  const openAt = new Date(data.openAt);
  const closeAt = new Date(data.closeAt);

  if (openAt <= now) errors.push("파티 시작일은 현재 시간 이후여야 합니다.");
  if (closeAt <= openAt) errors.push("파티 종료일은 시작일 이후여야 합니다.");
  if (data.maxAttendeeCnt < 1) errors.push("최대 참가 인원은 1명 이상이어야 합니다.");
  if (data.maxChangeCnt < 1) errors.push("최대 교환 의류 수는 1벌 이상이어야 합니다.");

  // 배송 정보
  if (!data.deliverAddress.trim()) errors.push("배송 주소를 입력해주세요.");
  const desiredDate = new Date(data.desiredDate);
  if (isNaN(desiredDate.getTime())) errors.push("희망 배송일을 입력해주세요.");

  // 세금계산서
  if (data.taxReceipt) {
    if (!data.taxEmail.trim()) {
      errors.push("세금계산서 이메일을 입력해주세요.");
    } else if (!isValidEmail(data.taxEmail)) {
      errors.push("세금계산서 이메일 형식이 올바르지 않습니다.");
    }
    if (!data.taxId.trim()) {
      errors.push("사업자번호를 입력해주세요.");
    } else if (!isValidTaxId(data.taxId)) {
      errors.push("사업자번호 형식이 올바르지 않습니다.");
    }
  }

  return { isValid: errors.length === 0, errors };
};
