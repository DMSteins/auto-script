import { ipcMain } from 'electron';

ipcMain.on('ipc-save-json', async (event, arg) => {
  console.log(arg, 11111);
});
