/* TẠP HÓA ONLINE — Service Worker (PWA) */
const CACHE = "taphoa-v7";

/* Các file chắc chắn có — nạp sẵn để chạy offline.
   (Không liệt kê file game ở đây để tránh lỗi nếu thiếu file; chúng sẽ được lưu khi dùng.) */
const CORE = [
  "./",
  "./index.html",
  "./mau-thuong-mai.html",
  "./mau-neon.html",
  "./tao-profile.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // cache từng file, file nào lỗi thì bỏ qua, không làm hỏng cả quá trình
      Promise.all(CORE.map((url) => c.add(url).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Trang HTML: ưu tiên mạng (để luôn mới), lỗi mạng thì lấy bản đã lưu.
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Tài nguyên khác (ảnh, font, CSS...): lấy cache trước, không có thì tải mạng rồi lưu lại.
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached)
    )
  );
});
