import { FormEventHandler } from 'react';

// const o = Object.keys(inputData);
// let allValid = true;
// if ((baseObject as any)["image"] == undefined && image == null) {
//   alert("Please upload an image");
//   allValid = false;
// }
// for (let i = 0; i < o.length; i++) {
//   const key = o[i] as keyof typeof inputData;
//   if ((inputData[key] as any).value.length < 1) {
//     alert(key);
//     allValid = false;
//     break;
//   }
// }
// if (allValid) {
//   setIsLoading(true);
//   setQrUrl("");
//   const result = await onSave(
//     inputData,
//     image,
//     (baseObject as any)["imageId"] ?? null,
//     id
//   );
//   setQrUrl(
//     `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${result.id}`
//   );
//   setInputData(baseObject);
//   setImage(null);
// }
// setIsLoading(false);
// if (id != null && onCompleted != null) {
//   onCompleted();
// }
