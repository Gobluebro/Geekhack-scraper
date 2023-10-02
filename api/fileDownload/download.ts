import { Image } from "@/utils/types";
import JSZip from "jszip";
// @ts-ignore
import * as JSZipUtils from "jszip-utils";
import {saveAs} from 'file-saver';

const urlToPromise = (url: string) => {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err: any, data: string) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }) as Promise<string>;
};

export const downloadImages = async (images: Image[], title: string) => {
  var zip = new JSZip();
  images.forEach(image =>
    zip.file(image.name || "", urlToPromise(image.url || ""), { binary: true })
  );
  zip.generateAsync({ type: "blob" }).then(function callback (blob) {
    // see FileSaver.js
    saveAs(blob, `${title}.zip`);
  });
};
