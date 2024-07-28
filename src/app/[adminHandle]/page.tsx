import Appointment from '@/pages/Appointment';
import React from 'react';

const page = ({ params }: { params: { adminHandle: string } }) => {
    const { adminHandle } = params
    return (
        <>
            <Appointment adminHandle={adminHandle} />
        </>
    );
};

export default page;