import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROLE, ESTATUS } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
import { IInstallRecord } from '@/models/install.model';
import { IMaintenance } from '@/models/maintenance.model';
import { format } from 'date-fns';
import { Platform } from 'react-native';
export function replaceHead(html: string, newHeadContent: string): string {
  // Regular expression to match the head section
  const headRegex = /<head[^>]*>[\s\S]*<\/head>/i;

  // Construct the new head section
  const newHead = `<head>${newHeadContent}</head>`;

  // Replace the existing head section with the new one
  const updatedHtml = html.replace(headRegex, newHead);

  return updatedHtml;
}

const fontUrl = Platform.select({
  ios: 'Nunito-Regular.ttf',
  android: 'file:///android_asset/fonts/Nunito-Regular.ttf',
});

const htmlStyles = `
    @media print { * { -webkit-print-color-adjust: exact !important; } }

    @font-face {
      font-family: 'Nunito-Regular'; 
      src: url('${fontUrl}') format('truetype')
   }

    * {
        font-family: 'Nunito-Regular';
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${COLOR_SYSTEM.white};
        padding: 1rem;
    }

    img {
      width: 100% !important;
      height: auto;
      margin: 16px 0;
    }

    .image {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    div, p, ol, ul, li, table, tr, td, th, tbody, thead, tfoot {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #353535;
        text-align: justify;
    }
`;

export const createHtmlTemplate = (html: string = '') => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8">
          <title>Html content</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              ${htmlStyles}
          </style>
      </head>
      <body>
          ${html}
      </body>
  </html>
`;
};

export const formatContent = (content: string) => {
  return replaceHead(
    content,
    `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <meta charset="utf-8">
    <title>
    </title>
    <style>
        @media print { * { -webkit-print-color-adjust: exact !important; } }

        @font-face {
          font-family: 'Nunito-Regular';
          src: url('${fontUrl}') format('opentype')
        }

        body {
          line-height: 108%;
          font-size: 14px;
          padding: 0.5rem;
          font-family: 'Nunito-Regular';
          background-color: ${COLOR_SYSTEM.white};
        }

        h1, h2, h3, h4, h5, h6 {
          line-height: normal;
        }

        h1 {
          font-size: 40px;
        }

        h2 {
          font-size: 24px;
        }

        p {
          font-size: 16px;
          font-weight: 400;
          margin: 0pt 0pt 8pt;
          line-height: normal;
        }

        img {
          width: 100% !important;
          height: auto;
          margin: 16px 0;
        }

        iframe {
          width: 100% !important;
        }

        .image {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        span.Hyperlink {
          text-decoration: underline;
          color: #0563c1;
        }

        figure {
          margin: 0;
          padding: 0;
        }

        .table table {
          display: table;
          width: 100%;
          border: 1px double #b3b3b3;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .table table td,
        .table table th {
            border: 1px solid #bfbfbf;
        }
        .table td,
        .table th {
            position: relative;
            overflow-wrap: break-word;
        }
    </style>
  </head>
  `,
  );
};

export const generateBDHTML = (maintenance: IMaintenance, authUser: any) => {
  return `
    <html>
      <body>
        <h1 style="text-align: center">CHI TIẾT BẢO DƯỠNG THIẾT BỊ</h1>
        <h2>I.THÔNG TIN BẢO DƯỠNG</h2>
        <p>Trường học bảo dưỡng: ${maintenance?.school?.name}</p>
        <p>Địa chỉ: ${maintenance?.school?.address}</p>
        <p>Thiết bị bảo dưỡng: ${maintenance?.installRecord?.product?.name}</p>
        <p>Trạng thái: <span style="color: ${
          maintenance?.status?.id === ESTATUS.PENDING
            ? COLOR_SYSTEM.errorRegular
            : maintenance?.status?.id === ESTATUS.INPROGRESS
            ? COLOR_SYSTEM.informationRegular
            : COLOR_SYSTEM.primary
        };">${maintenance?.status?.name} (${maintenance?.categoryMaintenance?.name})</span></p>
        <p>Tiêu đề: ${maintenance?.title}</p>
        <p>Thời gian sự cố: ${
          maintenance?.createdAt ? format(new Date(maintenance?.createdAt), 'dd/MM/yyyy HH:mm:ss') : 'N/A'
        }</p>
        <p>Hiện trạng: ${maintenance?.reason}</p>
        <p>Ảnh đính kèm:</p>
        ${maintenance?.images_request
          .map(
            (img) =>
              `<img src="${BASE_URL}${img}" alt="image" style="height: 200px; width: 200px; object-fit: contain;border: 1px solid; margin-right: 10px">`,
          )
          .join('')}
        ${
          maintenance?.status?.id === ESTATUS.COMPLETE || maintenance?.status?.id === ESTATUS.COMPLETED
            ? `
            <h2>II.NỘI DUNG BẢO DƯỠNG (CÔNG TY SKY T&D)</h2>
            <p>Nhân viên xử lý: ${
              authUser?.role?.role === EROLE.STAFF && authUser?.id === maintenance?.staff?.id
                ? 'Tôi'
                : maintenance?.staff?.fullName
            }</p>
            <p>Thời gian xử lý: ${
              maintenance?.timeMaintenance
                ? format(new Date(maintenance?.timeMaintenance), 'dd/MM/yyyy HH:mm:ss')
                : 'N/A'
            }</p>
            ${
              Number(maintenance?.repairFees) > 0
                ? `<p>Số tiền sửa chữa: ${Number(maintenance?.repairFees).toLocaleString()} VNĐ</p>`
                : ''
            }
            <p>Nguyên nhân: ${maintenance?.reasonRepair}</p>
            <p>Phương án xử lý: ${maintenance?.solution}</p>
            <p>Ảnh xử lý:</p>
            ${maintenance?.images_response
              ?.map(
                (img: any) =>
                  `<img src="${BASE_URL}${img}" alt="image" style="height: 200px; width: 200px; object-fit: contain;border: 1px solid; margin-right: 10px">`,
              )
              .join('')}
          `
            : ''
        }
      </body>
    </html>
  `;
};

export const generateSCHTML = (maintenance: IMaintenance, authUser: any) => {
  return `
    <html>
      <body>
        <h1 style="text-align: center">CHI TIẾT SỬA CHỮA THIẾT BỊ</h1>
        <h2>I.THÔNG TIN SỬA CHỮA</h2>
        <h3>BÊN SỬA CHỮA : CÔNG TY SKY T&D</h3>
        <p>Nhân viên sửa chữa: ${
          authUser?.role?.role === EROLE.STAFF && authUser?.id === maintenance?.staff?.id
            ? 'Tôi'
            : maintenance?.staff?.fullName
        }</p>
            <p>Thời gian xử lý: ${
              maintenance?.timeMaintenance
                ? format(new Date(maintenance?.timeMaintenance), 'dd/MM/yyyy HH:mm:ss')
                : 'N/A'
            }</p>
         <p>Địa chỉ: Số nhà 12 Phố giáp nhị,P Thịnh Liệt, Q.Hoàng Mai, Hà Nội</p>
         <p>Hotline: 0818.00.77.11 - 0912.912.381</p>

         <h3>BÊN YÊU CẦU</h3>
          <p>Ông/Bà: ${maintenance.account?.fullName}</p>
          <p>Bộ phận: Quản lý thiết bị lọc nước trường học</p>
          <p>Trường học sửa chữa: ${maintenance?.school?.name}</p>
         <h2>II.NỘI DUNG SỬA CHỮA</h2>
          <p>Tiêu đề trước khi sửa chữa: ${maintenance?.title}</p>
          <p>Hiện trạng trước khi sửa chữa: ${maintenance?.reason}</p>
          <p>Ảnh đính kèm:</p>
          ${maintenance?.images_request
            .map(
              (img) =>
                `<img src="${BASE_URL}${img}" alt="image" style="height: 200px; width: 200px; object-fit: contain;border: 1px solid; margin-right: 10px">`,
            )
            .join('')}



          <p>Thời gian xử lý: ${
            maintenance?.timeMaintenance ? format(new Date(maintenance?.timeMaintenance), 'dd/MM/yyyy HH:mm:ss') : 'N/A'
          }</p>
          <p>Nguyên nhân: ${maintenance?.reasonRepair}</p>
          <p>Phương án xử lý: ${maintenance?.solution}</p>
          <p>Ảnh xử lý:</p>
          ${maintenance?.images_response
            ?.map(
              (img: any) =>
                `<img src="${BASE_URL}${img}" alt="image" style="height: 200px; width: 200px; object-fit: contain;border: 1px solid; margin-right: 10px">`,
            )
            .join('')}
          ${
            Number(maintenance?.repairFees) > 0
              ? `<p style="color: #F4442F">Số tiền sửa chữa: ${Number(
                  maintenance?.repairFees,
                ).toLocaleString()} VNĐ</p>`
              : ''
          }
      </body>
    </html>
  `;
};

export const generateInstallRecordHTML = (data: IInstallRecord, authUser: any) => {
  return `
    <html>
      <body>
        <h1 style="text-align: center">CHI TIẾT HỒ SƠ LẮP ĐẶT</h1>
        <h2>BÊN BÀN GIAO VÀ LẮP ĐẶT : CÔNG TY SKY T&D</h2>
        <p>Nhân viên lắp dặt: ${data?.staff?.fullName}</p>
        <p>Thời gian lắp đặt: ${
          data?.timeInstall ? format(new Date(data?.timeInstall), 'dd/MM/yyyy HH:mm:ss') : 'N/A'
        }</p>
         <p>Địa chỉ công ty: Số nhà 12 Phố giáp nhị,P Thịnh Liệt, Q.Hoàng Mai, Hà Nội</p>
         <p>Hotline: 0818.00.77.11 - 0912.912.381</p>

        <h2>BÊN NHẬN : CÔNG TY SKY T&D</h2>
        <p>Ông/Bà: ${data.account?.fullName}</p>
        <p>Bộ phận: Quản lý thiết bị lọc nước trường học</p>
        <p>Trường học yêu cầu: ${data?.school?.name}</p>
        <p>Địa chỉ: ${data?.school?.address}</p>

        <h4>Bên bàn giao và lắp đặt một số thiết bị như sau: </h4>
         <div style="display: flex;gap:5;">
          <div>
            <img src="${BASE_URL}${
    data?.product?.images[0] || ''
  }" alt="image" style="height: 280px; width: 280px; object-fit: contain;border: 1px solid; margin-right: 10px" />
          </div>
          <div>
            <p style="font-weight: 500; font-size: 16px;"> ${data?.product?.name || ''}</p>
             <div style="display: flex;gap: 5;align-items: center;">
              <p >Số lượng : </p> <p style="font-weight: 500;">  ${data?.quantity || ''} thiết bị</p>
             </div>

            <div style="display: flex;gap: 5;align-items: center;">
              <p >Giá thiết bị : </p>
              <p style="color: red"> ${
                data?.product?.price
                  ? Number(
                      data?.product?.price - (data?.product?.price * (data?.product?.discount || 0)) / 100,
                    ).toLocaleString()
                  : ''
              } VNĐ</p>
             </div>

              <div style="display: flex;gap: 5;align-items: center;">
                <p >Giá gốc : </p>
                <p style="font-weight: 500;text-decoration: line-through;"> ${Number(
                  data?.product?.price,
                ).toLocaleString()} VNĐ</p>
              </div>
          </div>
        </div>
        <p style="color: red">Thành tiền :${Number(data?.totalAmount).toLocaleString()} VNĐ</p>
         <p>Mọi thắc mắc xin liên hệ tới chúng tôi thông qua hotline ở trên, xin cảm ơn bạn đã đồng hành. Tất cả sự đóng góp của bạn sẽ là hành trang tốt cho sự phát triển của chúng tôi sau này</p>
      </body>
    </html>
  `;
};
