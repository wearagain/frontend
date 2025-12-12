import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePostParty } from "@/hooks/party/usePostPartyHost";
import { usePartyHostStore } from "@/store/useHostStore";
import { formatDate } from "@/utils/formatDate";
import { partyHostValidation } from "@/utils/validations/partyHostValidation.ts";
import TermsItem from "@/components/signup/TermsItem";
import Modal from "@/components/ui/modal";

import InfoRow from "./step5Confirm/InfoRow";
import InfoSection from "./step5Confirm/InfoSection";
import ConfirmModalContent from "./step5Confirm/ConfirmModalContent";
import HostEditModal from "./step5Confirm/HostEditModal";
import PartyEditModal from "./step5Confirm/PartyEditModal";
import DeliveryEditModal from "./step5Confirm/DeliveryEditModal";

interface Step5Props {
  onNext: () => void;
}

export default function Step5Confirm({ onNext }: Step5Props) {
  const store = usePartyHostStore();
  const { mutate: postParty, isPending } = usePostParty();

  // 약관 동의 상태
  const [checked, setChecked] = useState({
    all: false,
    service: false,
    privacy: false,
    notice: false,
  });

  // 확인 모달 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 수정 모달 상태
  const [showHostModal, setShowHostModal] = useState(false);
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  // 수정 데이터 상태
  const [editHostData, setEditHostData] = useState({
    name: store.name,
    groupName: store.groupName,
    phone: store.phone,
    email: store.email,
  });

  const [editPartyData, setEditPartyData] = useState({
    openAt: store.openAt,
    closeAt: store.closeAt,
    openTime: store.openTime || "",
    closeTime: store.closeTime || "",
    address: store.address,
    addressDetail: store.addressDetail,
    maxAttendeeCnt: store.maxAttendeeCnt,
    maxChangeCnt: store.maxChangeCnt,
    partyDescription: store.partyDescription,
  });

  const [editDeliveryData, setEditDeliveryData] = useState({
    deliverAddress: store.deliverAddress,
    deliverAddressDetail: store.deliverAddressDetail,
    desiredDate: store.desiredDate,
    taxReceipt: store.taxReceipt,
    taxId: store.taxId,
    taxEmail: store.taxEmail,
  });

  const allAgreed = checked.service && checked.privacy && checked.notice;

  const handleToggle = (key: keyof typeof checked) => {
    if (key === "all") {
      const newState = !checked.all;
      setChecked({
        all: newState,
        service: newState,
        privacy: newState,
        notice: newState,
      });
    } else {
      const updated = { ...checked, [key]: !checked[key] };
      const allChecked = updated.service && updated.privacy && updated.notice;
      setChecked({ ...updated, all: allChecked });
    }
  };

  const openDate = formatDate(store.openAt);
  const closeDate = formatDate(store.closeAt);
  const desiredDate = formatDate(store.desiredDate);

  // 신청하기 버튼 클릭 시 확인 모달 표시
  const handleSubmitClick = () => {
    if (!allAgreed) {
      return;
    }

    // 최종 유효성 검증 (각 Step에서 이미 검증되었지만 안전을 위해)
    const validation = partyHostValidation({
      isGroup: store.isGroup,
      groupName: store.groupName,
      name: store.name,
      phone: store.phone,
      email: store.email,
      openAt: store.openAt,
      closeAt: store.closeAt,
      address: store.address,
      maxChangeCnt: store.maxChangeCnt,
      maxAttendeeCnt: store.maxAttendeeCnt,
      partyTitle: store.partyTitle,
      deliverAddress: store.deliverAddress,
      desiredDate: store.desiredDate,
      taxReceipt: store.taxReceipt,
      taxEmail: store.taxEmail,
      taxId: store.taxId,
    });

    if (!validation.isValid) {
      console.warn("유효성 검증 실패:", validation.errors);
      return;
    }

    setShowConfirmModal(true);
  };

  // 최종 제출
  const handleConfirmSubmit = () => {
    postParty(undefined, {
      onSuccess: () => {
        setShowConfirmModal(false);
        store.reset(); // 신청 성공 시 store 초기화
        onNext();
      },
    });
  };

  // 주최자 정보 수정
  const handleEditHost = () => {
    setEditHostData({
      name: store.name,
      groupName: store.groupName,
      phone: store.phone,
      email: store.email,
    });
    setShowHostModal(true);
  };

  const handleSaveHost = () => {
    store.setField("name", editHostData.name);
    store.setField("groupName", editHostData.groupName);
    store.setField("phone", editHostData.phone);
    store.setField("email", editHostData.email);
    setShowHostModal(false);
  };

  // 파티 정보 수정
  const handleEditParty = () => {
    setEditPartyData({
      openAt: store.openAt,
      closeAt: store.closeAt,
      openTime: store.openTime || "",
      closeTime: store.closeTime || "",
      address: store.address,
      addressDetail: store.addressDetail,
      maxAttendeeCnt: store.maxAttendeeCnt,
      maxChangeCnt: store.maxChangeCnt,
      partyDescription: store.partyDescription,
    });
    setShowPartyModal(true);
  };

  const handleSaveParty = () => {
    store.setField("openAt", editPartyData.openAt);
    store.setField("closeAt", editPartyData.closeAt);
    store.setField("openTime", editPartyData.openTime);
    store.setField("closeTime", editPartyData.closeTime);
    store.setField("address", editPartyData.address);
    store.setField("addressDetail", editPartyData.addressDetail);
    store.setField("maxAttendeeCnt", editPartyData.maxAttendeeCnt);
    store.setField("maxChangeCnt", editPartyData.maxChangeCnt);
    store.setField("partyDescription", editPartyData.partyDescription);
    setShowPartyModal(false);
  };

  // 배송 및 결제 정보 수정
  const handleEditDelivery = () => {
    setEditDeliveryData({
      deliverAddress: store.deliverAddress,
      deliverAddressDetail: store.deliverAddressDetail,
      desiredDate: store.desiredDate,
      taxReceipt: store.taxReceipt,
      taxId: store.taxId,
      taxEmail: store.taxEmail,
    });
    setShowDeliveryModal(true);
  };

  const handleSaveDelivery = () => {
    store.setField("deliverAddress", editDeliveryData.deliverAddress);
    store.setField("deliverAddressDetail", editDeliveryData.deliverAddressDetail);
    store.setField("desiredDate", editDeliveryData.desiredDate);
    store.setField("taxReceipt", editDeliveryData.taxReceipt);
    store.setField("taxId", editDeliveryData.taxId);
    store.setField("taxEmail", editDeliveryData.taxEmail);
    setShowDeliveryModal(false);
  };

  return (
    <div className='flex flex-col h-full overflow-hidden mb-24'>
      {/* 헤더 */}
      <div className='bg-white shrink-0 sticky top-0 z-10'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          마지막으로 정보 확인 후
          <br />
          신청을 완료해 주세요
        </h2>
      </div>

      {/* 정보 영역 */}
      <div className='flex-1 overflow-y-auto custom-scroll'>
        {/* 주최자 정보 */}
        <InfoSection title='주최자 정보' onEdit={handleEditHost}>
          <InfoRow label='주최자' value={store.name} />
          <InfoRow label='소속' value={store.groupName} />
          <InfoRow label='연락처' value={store.phone} />
          <InfoRow label='이메일' value={store.email} />
        </InfoSection>
        <div className='divider' />

        {/* 파티 정보 */}
        <InfoSection title='파티 정보' onEdit={handleEditParty}>
          <InfoRow label='날짜' value={`${openDate} ~ ${closeDate}`} />
          <InfoRow label='시간' value={`${store.openTime} ~ ${store.closeTime}`} />
          <InfoRow
            label='장소'
            value={`${store.address}${store.addressDetail ? ` ${store.addressDetail}` : ""}`}
          />
          <InfoRow label='최대 참석자 수' value={`${store.maxAttendeeCnt}명`} />
          <InfoRow label='최대 의류 수량' value={`${store.maxChangeCnt}벌`} />
          <InfoRow label='소개' value={store.partyDescription} />
        </InfoSection>
        <div className='divider' />

        {/* 배송 및 결제 */}
        <InfoSection title='배송 및 결제' onEdit={handleEditDelivery}>
          <InfoRow
            label='주소'
            value={`${store.deliverAddress}${store.deliverAddressDetail ? ` ${store.deliverAddressDetail}` : ""}`}
          />
          <InfoRow label='희망 배송일' value={desiredDate} />
          <InfoRow label='세금계산서 발행' value={store.taxReceipt ? "예" : "아니요"} />
          {store.taxReceipt && (
            <>
              <InfoRow label='사업자번호' value={store.taxId} />
              <InfoRow label='발행 이메일' value={store.taxEmail} />
            </>
          )}
        </InfoSection>
      </div>

      {/* 약관 동의 및 버튼 */}
      <div className='shrink-0 sticky bottom-0 bg-white px-5 pt-5 drop-shadow-lg'>
        <div className='mb-4'>
          <div className='flex flex-col gap-4'>
            <TermsItem
              label='아래 내용에 전체 동의합니다'
              checked={checked.all}
              onToggle={() => handleToggle("all")}
            />

            <div className='flex flex-col gap-3'>
              <TermsItem
                label='서비스 이용약관 동의'
                required
                checked={checked.service}
                onToggle={() => handleToggle("service")}
                showLink
              />
              <TermsItem
                label='개인정보 수집 및 이용 동의'
                required
                checked={checked.privacy}
                onToggle={() => handleToggle("privacy")}
                showLink
              />
              <TermsItem
                label='주최 고지사항 동의'
                required
                checked={checked.notice}
                onToggle={() => handleToggle("notice")}
                showLink
              />
            </div>
          </div>
        </div>

        <Button
          theme='purple'
          onClick={handleSubmitClick}
          disabled={!allAgreed || isPending}
          className='w-full h-12 text-base font-semibold'
        >
          {isPending ? "신청중" : "신청하기"}
        </Button>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <Modal
          header='해당 정보로 신청하겠습니까?'
          confirmText='신청하기'
          closeText='아니요'
          theme='purple'
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSubmit}
          confirmDisabled={isPending}
        >
          <ConfirmModalContent
            partyDate={`${openDate} ~ ${closeDate}`}
            partyTime={`${store.openTime} ~ ${store.closeTime}`}
            partyAddress={`${store.address}${store.addressDetail ? ` ${store.addressDetail}` : ""}`}
            maxAttendeeCnt={store.maxAttendeeCnt}
            maxChangeCnt={store.maxChangeCnt}
            description={store.partyDescription}
          />
        </Modal>
      )}

      {/* 주최자 정보 수정 모달 */}
      {showHostModal && (
        <HostEditModal
          data={editHostData}
          onChange={setEditHostData}
          onClose={() => setShowHostModal(false)}
          onConfirm={handleSaveHost}
        />
      )}

      {/* 파티 정보 수정 모달 */}
      {showPartyModal && (
        <PartyEditModal
          data={editPartyData}
          onChange={setEditPartyData}
          onClose={() => setShowPartyModal(false)}
          onConfirm={handleSaveParty}
        />
      )}

      {/* 배송 및 결제 정보 수정 모달 */}
      {showDeliveryModal && (
        <DeliveryEditModal
          data={editDeliveryData}
          onChange={setEditDeliveryData}
          onClose={() => setShowDeliveryModal(false)}
          onConfirm={handleSaveDelivery}
        />
      )}
    </div>
  );
}
