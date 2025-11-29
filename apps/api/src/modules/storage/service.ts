export interface StorageService {
    upload(key: string, data: Buffer): Promise<string>;
    get(key: string): Promise<Buffer>;
}

export class LocalStorageService implements StorageService {
    async upload(key: string, data: Buffer): Promise<string> {
        // In a real app, write to disk or S3
        console.log(`Uploading ${key} (${data.length} bytes)`);
        return `http://localhost:3001/files/${key}`;
    }

    async get(key: string): Promise<Buffer> {
        return Buffer.from('Mock File Content');
    }
}
