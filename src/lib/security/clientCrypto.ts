const HEX_REGEX = /^[0-9a-f]+$/i;

const encoder = new TextEncoder();

const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const hexToBytes = (hex: string): Uint8Array => {
  if (!HEX_REGEX.test(hex) || hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  const output = new Uint8Array(hex.length / 2);
  for (let i = 0; i < output.length; i += 1) {
    output[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return output;
};

const importKey = async (hexKey: string): Promise<CryptoKey> => {
  if (hexKey.length !== 64) {
    throw new Error("Encryption key must be 64 hex characters");
  }

  return window.crypto.subtle.importKey(
    "raw",
    hexToBytes(hexKey),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
};

const splitCipherAndTag = (
  encrypted: Uint8Array
): { cipher: Uint8Array; tag: Uint8Array } => {
  const tagBytes = 16;
  if (encrypted.length <= tagBytes) {
    throw new Error("Encrypted payload is invalid");
  }

  return {
    cipher: encrypted.slice(0, -tagBytes),
    tag: encrypted.slice(-tagBytes),
  };
};

interface EncryptedPayload {
  iv: string;
  content: string;
  tag: string;
}

export const encryptTextPayload = async (
  text: string,
  hexKey: string
): Promise<EncryptedPayload> => {
  const key = await importKey(hexKey);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      tagLength: 128,
    },
    key,
    encoder.encode(text)
  );

  const encrypted = new Uint8Array(encryptedBuffer);
  const { cipher, tag } = splitCipherAndTag(encrypted);

  return {
    iv: bytesToHex(iv),
    content: bytesToHex(cipher),
    tag: bytesToHex(tag),
  };
};

export const encryptPasswordForTransport = async (
  password: string,
  hexKey: string
): Promise<string> => {
  const payload = await encryptTextPayload(password, hexKey);
  return `${payload.iv}:${payload.content}:${payload.tag}`;
};
