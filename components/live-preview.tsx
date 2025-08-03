"use client";

import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Button } from '@/components/ui/button';
import { Download, Link } from 'lucide-react';
import { ensureUrlProtocol } from '@/lib/qr-code-generator';

interface LivePreviewProps {
  url: string;
  qrCodeColor: string;
  backgroundColor: string;
  logoUrl: string | null;
  qrName: string;
  scanCount: number;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  url,
  qrCodeColor,
  backgroundColor,
  logoUrl,
  qrName,
  scanCount,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (ref.current) {
      if (!qrCodeInstanceRef.current) {
        qrCodeInstanceRef.current = new QRCodeStyling({
          width: 160,
          height: 160,
          type: 'svg',
          data: ensureUrlProtocol(url),
          image: logoUrl || undefined,
          dotsOptions: { color: qrCodeColor, type: 'dots' },
          backgroundOptions: { color: backgroundColor },
          imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: 0.4 },
          cornersSquareOptions: { color: qrCodeColor, type: 'dot' },
          cornersDotOptions: { color: qrCodeColor, type: 'dot' },
        });
        qrCodeInstanceRef.current.append(ref.current);
      } else {
        qrCodeInstanceRef.current.update({
          data: ensureUrlProtocol(url),
          image: logoUrl || undefined,
          dotsOptions: { color: qrCodeColor, type: 'dots' },
          backgroundOptions: { color: backgroundColor },
          imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: 0.4 },
          cornersSquareOptions: { color: qrCodeColor, type: 'dot' },
          cornersDotOptions: { color: qrCodeColor, type: 'dot' },
        });
      }
    }
  }, [url, qrCodeColor, backgroundColor, logoUrl]);

  const handleDownload = () => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current.download({ name: 'qr-code', extension: 'svg' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(
      () => {},
      err => console.error('Could not copy text: ', err)
    );
  };

  return (
    <div className="w-full md:w-72 bg-gray-50 p-4 rounded-2xl shadow-sm flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Live Preview</h2>
      <div className="bg-white p-6 rounded-2xl shadow-inner flex flex-col items-center">
        <div className="w-full aspect-square bg-white flex items-center justify-center mb-4">
          <div ref={ref} />
        </div>
        <p className="font-semibold text-lg text-gray-800 mb-4">{qrName || 'Your QR Code'}</p>
        <div className="flex space-x-2 w-full">
                    <Button onClick={handleDownload} variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            <Link className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">Scans: {scanCount}</p>
      </div>
    </div>
  );
};

export default LivePreview;
