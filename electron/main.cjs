const { app, BrowserWindow, shell, screen } = require('electron');
const path = require('path');

// Поддержка Windows 7+
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('no-sandbox');

// Исправление размытости на Windows с высоким DPI
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  // Получаем размер экрана пользователя
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  // Размер окна — чуть больше телефона чтобы был фон вокруг
  const winWidth = Math.min(700, screenWidth - 100);
  const winHeight = Math.min(980, screenHeight - 50);

  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: 560,
    minHeight: 700,
    // Можно менять размер окна
    resizable: true,
    center: true,
    title: 'QwerUI — Qwerty 5 Pro',
    backgroundColor: '#0d0d1a',
    // Убираем стандартную рамку Windows для красоты
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      // Отключаем сглаживание которое вызывает размытость
      enableBlinkFeatures: '',
      zoomFactor: 1.0
    }
  });

  // Загружаем скомпилированный фронтенд
  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // Сбрасываем зум при загрузке (убирает размытость)
  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(1.0);
    win.webContents.setZoomLevel(0);
  });

  // Открывать внешние ссылки в браузере
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // При изменении размера окна — телефон остаётся по центру
  // через CSS flex (уже настроен в App.tsx)
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
