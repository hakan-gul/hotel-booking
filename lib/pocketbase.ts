// lib/pocketbase.ts
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://hakngul.pockethost.io');

// Global olarak autoCancellation'ı devre dışı bırak
pb.autoCancellation(false);

export default pb;