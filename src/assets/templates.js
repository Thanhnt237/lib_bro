export const templates = {
  phieu_muon_sach: {
    key: "phieu_muon_sach",
    html: `
    <section>
        <div style="display: flex; gap: 20px">
            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg/682px-Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg.png" alt="logo bach khoa" width="50" style="object-fit: contain" />

            <div>
                <p><span style="font-size:16px"><strong>Trường Đại học Bách Khoa Hà Nội</strong></span></p>

                <p><span style="font-size:16px"><strong>Thư viện Tạ Quang Bửu</strong></span></p>
            </div>
        </div>
    
        <p style="text-align:center"><span style="font-size:26px"><strong>PHIẾU MƯỢN S&Aacute;CH</strong></span></p>
    
        <p><span style="font-size:14px">T&ecirc;n nguời mượn: [TEN_NGUOI_MUON]</span></p>
    
        <table border="1" cellpadding="1" cellspacing="1" style="width:100%">
            <tbody>
                <tr>
                    <td><span style="font-size:14px">STT</span></td>
                    <td><span style="font-size:14px">T&ecirc;n s&aacute;ch</span></td>
                    <td><span style="font-size:14px">Số lượng</span></td>
                    <td><span style="font-size:14px">Đơn giá</span></td>
                    <td><span style="font-size:14px">Thành tiền</span></td>
                </tr>
                [SACH]
            </tbody>
        </table>
    
        <table style="width:100%;" class="signs-section">
            <tbody>
                <tr>
                    <td style="width:464px">
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">Nguời mượn</span></p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">[TEN_NGUOI_MUON]</span></p>
                    </td>
                    <td style="width:265px">&nbsp;</td>
                    <td style="text-align:center; width:389px">
                    <p><span style="font-size:14px">[REALTIME]</span></p>
    
                    <p><span style="font-size:14px">Thủ thư</span></p>
    
                    <p>&nbsp;</p>
    
                    <p>&nbsp;</p>
    
                    <p><span style="font-size:14px">[NGUOI_TAO_PHIEU]</span></p>
                    </td>
                    <td style="width:42px">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    
        <p>&nbsp;</p>
    </section>
    `,
  },
  phieu_tra_sach: {
    key: "phieu_tra_sach",
    html: `
    <section>
        <div style="display: flex; gap: 20px">
            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg/682px-Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg.png" alt="logo bach khoa" width="50" style="object-fit: contain" />

            <div>
                <p><span style="font-size:16px"><strong>Trường Đại học Bách Khoa Hà Nội</strong></span></p>

                <p><span style="font-size:16px"><strong>Thư viện Tạ Quang Bửu</strong></span></p>
            </div>
        </div>
    
        <p style="text-align:center"><span style="font-size:26px"><strong>PHIẾU TRẢ S&Aacute;CH</strong></span></p>
    
        <p><span style="font-size:14px">T&ecirc;n người trả: [TEN_NGUOI_MUON]</span></p>
    
        <table border="1" cellpadding="1" cellspacing="1" style="width:100%">
            <tbody>
                <tr>
                <td><span style="font-size:14px">STT</span></td>
                <td><span style="font-size:14px">T&ecirc;n s&aacute;ch</span></td>
                </tr>
                [SACH]
            </tbody>
        </table>
    
        <table style="width:100%;" class="signs-section">
            <tbody>
                <tr>
                    <td style="width:464px">
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">Người trả</span></p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">[TEN_NGUOI_MUON]</span></p>
                    </td>
                    <td style="width:265px">&nbsp;</td>
                    <td style="text-align:center; width:389px">
                    <p><span style="font-size:14px">[REALTIME]</span></p>
    
                    <p><span style="font-size:14px">Thủ thư</span></p>
    
                    <p>&nbsp;</p>
    
                    <p>&nbsp;</p>
    
                    <p><span style="font-size:14px">[NGUOI_TAO_PHIEU]</span></p>
                    </td>
                    <td style="width:42px">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    
        <p>&nbsp;</p>
    </section>
    `,
  },
  phieu_nhap_sach: {
    key: "phieu_nhap_sach",
    html: `
    <section>
        <div style="display: flex; gap: 20px">
            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg/682px-Logo_Đại_h%E1%BB%8Dc_Bách_Khoa_Hà_Nội.svg.png" alt="logo bach khoa" width="50" style="object-fit: contain" />

            <div>
                <p><span style="font-size:16px"><strong>Trường Đại học Bách Khoa Hà Nội</strong></span></p>

                <p><span style="font-size:16px"><strong>Thư viện Tạ Quang Bửu</strong></span></p>
            </div>
        </div>
    
        <p style="text-align:center"><span style="font-size:26px"><strong>PHIẾU NHẬP S&Aacute;CH</strong></span></p>
    
        <p><span style="font-size:14px">T&ecirc;n người nhập: [TEN_NGUOI_MUON]</span></p>
    
        <table border="1" cellpadding="1" cellspacing="1" style="width:100%">
            <tbody>
                <tr>
                    <td><span style="font-size:14px">STT</span></td>
                    <td><span style="font-size:14px">T&ecirc;n s&aacute;ch</span></td>
                    <td><span style="font-size:14px">Số lượng</span></td>
                </tr>
                [SACH]
            </tbody>
        </table>
    
        <table style="width:100%;" class="signs-section">
            <tbody>
                <tr>
                    <td style="width:464px">
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">Người nhập</span></p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center">&nbsp;</p>
    
                    <p style="text-align:center"><span style="font-size:14px">[TEN_NGUOI_MUON]</span></p>
                    </td>
                    <td style="width:265px">&nbsp;</td>
                    <td style="text-align:center; width:389px">
                    <p><span style="font-size:14px">[REALTIME]</span></p>
    
                    <p><span style="font-size:14px">Thủ thư</span></p>
    
                    <p>&nbsp;</p>
    
                    <p>&nbsp;</p>
    
                    <p><span style="font-size:14px">[NGUOI_TAO_PHIEU]</span></p>
                    </td>
                    <td style="width:42px">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    
        <p>&nbsp;</p>
    </section>
    `,
  },
};
