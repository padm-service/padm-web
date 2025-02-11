import { v4 as uuidv4 } from 'uuid';

export function randomUsername() {
    return 'user-' + uuidv4().slice(0, 8); // 取 UUID 前8位
}

