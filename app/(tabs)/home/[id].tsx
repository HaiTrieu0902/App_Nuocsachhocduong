import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { createHtmlTemplate } from '@/utils/htmlTemplate';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import WebView from 'react-native-webview';

const DetailNewsScreen = () => {
  const { id, news } = useLocalSearchParams();
  const content =
    '<head></head><body><p>Những thông tin này được các chuyên gia của Việt Nam và quốc tế khuyến cáo tại hội thảo "Chiến lược thích ứng với biến đổi khí hậu, tập trung vào khủng hoảng khí hậu và nguồn nước" tổ chức tại Hà Nội sáng 28-3, trong khuôn khổ Tuần lễ nước quốc tế Singapore.</p><h2><strong>Mới chỉ xử lý được 17% nước thải</strong></h2><p>"Hiện Việt Nam có 750 nhà máy xử lý <a href="https://tuoitre.vn/man-xam-nhap-sau-o-mien-tay-nuoc-ngot-khan-hiem-20240222163021958.htm/nuoc-sach.html">nước sạch</a> với tổng công suất hơn 1 triệu m3/ngày đêm. Tỉ lệ dân cư đô thị được dùng nước sạch hơn 92%, trong khi trung bình cả nước là 17,5%" - ông Nguyễn Ngọc Điệp, chủ tịch Hội Cấp thoát nước Việt Nam, cho biết.</p><p>Theo ông Điệp, hiện có 71 doanh nghiệp thoát nước, xử lý nước thải, chủ yếu là thoát nước dùng chung với 82 nhà máy xử lý nước thải, công suất thiết kế 1 triệu m3/ngày đêm, cùng với khoảng 80 dự án xử lý nước thải, công suất hơn 2 triệu m3/ngày đêm đang được triển khai. Tuy nhiên, tỉ lệ thu gom nước thải mới đạt 60% và tỉ lệ xử lý nước thải mới đạt 17%.</p><p>"Trong khi đó, vấn đề ngập lụt đô thị, nhất là tại Hà Nội, TP.HCM là cấp bách, nhưng lại thiếu giải pháp căn cơ, lâu dài" - ông Điệp nhấn mạnh.</p><p>Cũng tại hội thảo, GS Nguyễn Việt Anh, viện trưởng Viện Khoa học và Kỹ thuật môi trường, Trường ĐH Xây dựng Hà Nội, đánh giá: "Hiện nay, ngành nước của Việt Nam có nhiều thách thức. Trong đó thách thức lớn nhất mà chúng ta đang gặp phải là do đất nước đang phát triển công nghiệp quá nhanh, quá nóng dẫn đến hạ tầng đáp ứng không kịp, nên các dịch vụ thiết yếu trong đó có nước vẫn chưa đáp ứng được nhu cầu".</p><p>"Bên cạnh đó, biến đổi khí hậu cũng là một thách thức không nhỏ. Hiện nay, nhiều địa phương ở Đồng bằng sông Cửu Long đối mặt với hạn hán khủng khiếp" - GS Nguyễn Việt Anh phân tích.</p><h2><strong>Ô nhiễm nguồn nước sẽ làm giảm tỉ lệ GDP</strong></h2><p>"Ô nhiễm nguồn nước sẽ làm giảm GDP của Việt Nam 3,5% mỗi năm, nếu chúng ta không có những hành động thiết thực để bảo vệ nguồn nước.&nbsp;</p><p>&nbsp;</p><p>Nguyên nhân của việc ô nhiễm là phần lớn nước thải chưa được xử lý đã xả thẳng vào nguồn nước. Ở Việt Nam có rất ít hộ gia đình có hệ thống thoát nước, trong đó chỉ có 17% nước thải đô thị được xử lý trước khi xả vào nguồn nước" - bà Halla Maher Qaddumi, chuyên gia kinh tế cấp cao ngành nước của WB, chia sẻ tại hội thảo.</p><p>Bà Halla Maher Qaddumi cho rằng Việt Nam được xếp vào mức dồi dào nước nhưng đang phải đối mặt với tình huống hạn hán vào mùa khô tại các sông trọng điểm, nơi có thể cấp đến 80% GDP cho cả nước. Tình trạng này sẽ trở nên tồi tệ hơn nếu trong vài thập kỷ tới chúng ta không có những hành động tích cực.</p><figure class="image"><img style="aspect-ratio:auto/auto;" src="http://103.237.145.144:2604/api/uploads/image/1718005659357-image_0.png" width="auto" height="auto"></figure><h3><strong>9 tỉ USD cho những nhu cầu thiết yếu về nước</strong></h3><p>"Việc đầu tư hạ tầng cấp thoát nước chưa đạt yêu cầu. Để 100% người dân được dùng nước sạch, chúng ta sẽ phải đầu tư lớn" - ông Điệp phân tích và chia sẻ số liệu từ báo cáo của Ngân hàng Thế giới (WB) cho hay chúng ta cần đầu tư khoảng 9 tỉ USD đến năm 2030 cho hạ tầng cấp thoát nước, bao gồm việc cung cấp đủ nước sạch cho người dân và thoát nước, xử lý nước thải. Đây là con số thách thức trong bối cảnh các nguồn lực đầu tư hạn chế - chủ tịch Hội Cấp thoát nước Việt Nam nhìn nhận.</p><p>Cùng quan điểm trên, GS Nguyễn Việt Anh còn cho rằng con số gần 9 tỉ USD chỉ đáp ứng được những nhu cầu tối thiểu.</p><p>Ông cho rằng thực tế nhiều tổ chức quốc tế đánh giá Việt Nam cần tới 30 tỉ USD để hoàn thiện các hạ tầng cấp thoát nước, gồm các dự án nước sạch, xử lý nước thải dân sinh và công nghiệp.</p><p>Vì thế, GS Nguyễn Việt Anh kiến nghị các cơ quan quản lý nhà nước cần đánh giá đúng giá trị của nước để đưa ra khung chính sách phù hợp, và cần tư nhân hóa, huy động nguồn lực đầu tư hạ tầng lĩnh vực này.&nbsp;</p><p>Còn ông Nguyễn Ngọc Điệp kiến nghị các ngành chức năng cần điều chỉnh hệ thống pháp luật theo hướng cởi mở và đổi mới kỹ thuật, để thu hút các doanh nghiệp trong và ngoài nước đầu tư vào lĩnh vực hạ tầng cấp thoát nước.</p><figure class="image"><img style="aspect-ratio:auto/auto;" src="http://103.237.145.144:2604/api/uploads/image/1718005659403-image_1.png" width="auto" height="auto"></figure><p>&nbsp;</p></body>';
  return (
    <SafeAreaViewUI className="px-5">
      <NavigationGoBack title="Chi tiết tin tức" />
      <ThemedView style={{ flex: 1 }}>
        <WebView
          style={{ borderRadius: 8 }}
          originWhitelist={['*']}
          source={{ html: createHtmlTemplate(content || ''), baseUrl: '' }}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default DetailNewsScreen;
