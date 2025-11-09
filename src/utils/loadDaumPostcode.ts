/**
 *
 * @returns Promise<void> — 스크립트 로드가 완료되면 resolve
 */
export const loadDaumPostcode = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject("window is not defined");
      return;
    }

    if (window.daum?.Postcode) {
      resolve();
      return;
    }

    const existing = document.getElementById("daum-postcode-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load Daum Postcode script");

    document.body.appendChild(script);
  });
};
