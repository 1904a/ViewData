import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://aybkkuhsmtzytnurpnjh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmtrdWhzbXR6eXRudXJwbmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMzMzNDMsImV4cCI6MjA5MDgwOTM0M30.2rojSxpGDEeapv7u1x5wJ_4ZTtdDMAD5F8_D2k6O_JI'
const supabase = createClient(supabaseUrl, supabaseKey)

// Đưa hàm fetchData ra phạm vi toàn cục để nút bấm gọi được
window.fetchData = async () => {
    const { data, error } = await supabase.from('Registrator').select('*')
    const container = document.getElementById('content')
    
    if (error) {
        container.innerHTML = "Lỗi: " + error.message
        return
    }

    container.innerHTML = data.map(item => `
    <div class="row" style="padding: 15px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <strong>ID:</strong> ${item.id} <br>
            <strong>Thông tin:</strong> <br>
            <span style="color: #555;">
                { id: ${item.id}, name: ${item.name}, tel: ${item.tel}, course: ${item.course}, content: ${item.content}, thoi_gian_dang_ky: ${item.thoi_gian_dang_ky} }
            </span>
        </div>
        <div>
            <button onclick="updateRow(${item.id})" style="background: #ffc107; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Sửa</button>
            <button onclick="deleteRow(${item.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; margin-left: 5px;">Xoá</button>
        </div>
    </div>
`).join('');
}

window.updateRow = async (id) => {
    const newName = prompt("Nhập tên mới:")
    if (!newName) return
    
    const { error } = await supabase.from('Registrator').update({ name: newName }).eq('id', id)
    if (error) alert(error.message)
    else fetchData() // Load lại dữ liệu
}

window.deleteRow = async (id) => {
    if (!confirm("Chắc chắn xoá chứ?")) return
    
    const { error } = await supabase.from('Registrator').delete().eq('id', id)
    if (error) alert(error.message)
    else fetchData()
}
window.fetchData = async () => {
    const container = document.getElementById('content');
    container.innerHTML = "Lưu đang tải dữ liệu..."; // Hiệu ứng chờ

    // Lấy tất cả data (*) từ bảng Registrator
    const { data, error } = await supabase
        .from('Registrator')
        .select('*')
        .order('id', { ascending: true }); // Sắp xếp theo ID cho dễ nhìn

    if (error) {
        console.error("Lỗi Supabase:", error);
        container.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = "<p>Bảng hiện tại không có dữ liệu nào.</p>";
        return;
    }

    // Hiển thị tất cả hàng ra màn hình
    container.innerHTML = data.map(item => `
        <div class="row" style="padding: 15px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>ID:</strong> ${item.id} <br>
                <strong>Nội dung:</strong> <span id="name-${item.id}">${JSON.stringify(item)}</span> 
            </div>
            <div>
                <button onclick="updateRow(${item.id})" style="background: #ffc107; border: none; padding: 5px 10px; cursor: pointer;">Sửa</button>
                <button onclick="deleteRow(${item.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: 5px;">Xoá</button>
            </div>
        </div>
    `).join('');
}; // Tải dữ liệu khi trang được tải lên