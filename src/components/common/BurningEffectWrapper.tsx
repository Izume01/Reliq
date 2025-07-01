'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BurningEffect = dynamic(() => import('@/components/common/BurningEffect'), {
  ssr: false,
});

export default function BurningEffectWrapper() {
  return <BurningEffect />;
} 