// ProForm Object
// {
//     "file": {
//         "uid": "rc-upload-1650940282089-2",
//         "lastModified": 1650878223530,
//         "lastModifiedDate": "2022-04-25T09:17:03.530Z",
//         "name": "WechatIMG10865.png",
//         "size": 37630,
//         "type": "image/png",
//         "percent": 100,
//         "originFileObj": {
//             "uid": "rc-upload-1650940282089-2"
//         },
//         "status": "done",
//         "response": {
//             "key": "Frrn917af6xB5q09Y_zh_vVwuMq1",
//             "hash": "Frrn917af6xB5q09Y_zh_vVwuMq1",
//             "bucket": "bitcode-lab-cloud-storage-general",
//             "mimeType": "image/png",
//             "accessUrl": "https://cloud-storage-general.bitcode-lab.com"
//         },
//         "xhr": {}
//     },
//     "fileList": [
//         {
//             "uid": "rc-upload-1650940282089-2",
//             "lastModified": 1650878223530,
//             "lastModifiedDate": "2022-04-25T09:17:03.530Z",
//             "name": "WechatIMG10865.png",
//             "size": 37630,
//             "type": "image/png",
//             "percent": 100,
//             "originFileObj": {
//                 "uid": "rc-upload-1650940282089-2"
//             },
//             "status": "done",
//             "response": {
//                 "key": "Frrn917af6xB5q09Y_zh_vVwuMq1",
//                 "hash": "Frrn917af6xB5q09Y_zh_vVwuMq1",
//                 "bucket": "bitcode-lab-cloud-storage-general",
//                 "mimeType": "image/png",
//                 "accessUrl": "https://cloud-storage-general.bitcode-lab.com"
//             },
//             "xhr": {},
//             "thumbUrl": "data:image/png;base64..."
//         }
//     ]
// }

/**
 * this help components to retreive image for create or update
 * @param {*} input
 * @returns
 */
export function getImageUrl(input) {
  if (typeof input === 'string') {
    return input;
  }
  if (!input?.file) {
    return;
  } else {
    const { response, status } = input.file;
    const { accessUrl, key } = response;
    return accessUrl + '/' + key;
  }
}
