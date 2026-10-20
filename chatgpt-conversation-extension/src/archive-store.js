let opening;
function database() {
  if (!opening) opening = new Promise((resolve, reject) => {
    const request = indexedDB.open('original-page-archives', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('archives');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Could not open local archive storage.'));
  });
  return opening;
}
async function operation(mode, action) {
  const db = await database();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('archives', mode);
    const request = action(transaction.objectStore('archives'));
    transaction.oncomplete = () => resolve(request?.result);
    transaction.onabort = transaction.onerror = event => {
      const error = transaction.error || event.target?.error;
      reject(new Error('Could not store this original-page archive.' + (error ? ' ' + error.name + ': ' + error.message : ' Browser storage may be full.')));
    };
  });
}
export const readOriginalArchive = key => operation('readonly', store => store.get(key));
export const writeOriginalArchive = (key, value) => operation('readwrite', store => store.put(value, key));
export const deleteOriginalArchive = key => operation('readwrite', store => store.delete(key));
export const clearOriginalArchives = () => operation('readwrite', store => store.clear());
