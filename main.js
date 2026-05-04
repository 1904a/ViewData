import { createClient } from '@supabase/supabase-js'

// Nên dùng biến môi trường, hoặc ít nhất phải có HTTPS
const supabaseUrl = 'https://aybkkuhsmtzytnurpnjh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmtrdWhzbXR6eXRudXJwbmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMzMzNDMsImV4cCI6MjA5MDgwOTM0M30.2rojSxpGDEeapv7u1x5wJ_4ZTtdDMAD5F8_D2k6O_JI' 
const supabase = createClient(supabaseUrl, supabaseKey)

window.fetchData = async () => {
    const container = document.getElementById('content');
    if (!container) return;
    
    container.innerHTML = "Đang tải...";
    const { data, error } = await supabase.from('Registrator').select('*').order('id');

    if (error) {
        container.innerHTML = "Lỗi: " + error.message;
        return;
    }
    
    // Render data... (giữ nguyên logic map của bạn)
    container.innerHTML = data.map(item => `...`).join('');
}

// Gọi luôn khi script load
window.fetchData();