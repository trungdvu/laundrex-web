import Container from '@/components/layout/container';
import Layout from '@/components/layout/layout';
import Seo from '@/components/seo/seo';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Bookings() {
  return (
    <Container title="Bookings">
      <Seo />
      <main className="py-24">
        <div className="py-64">Bookings</div>
      </main>
    </Container>
  );
}
