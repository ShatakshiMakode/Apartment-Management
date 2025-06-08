// app/staff/page.tsx
'use client'
import React, { useState } from 'react';

type Staff = {
  name: string;
  role: string;
};

const StaffManagement = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleAdd = () => {
    if (name && role) {
      setStaff([...staff, { name, role }]);
      setName('');
      setRole('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
      <div className="flex flex-col gap-2 mb-4">
        <input className="p-2 border" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className="p-2 border" value={role} onChange={e => setRole(e.target.value)} placeholder="Role" />
        <button className="bg-blue-500 text-white p-2" onClick={handleAdd}>Add Staff</button>
      </div>
      <ul>
        {staff.map((s, i) => (
          <li key={i} className="border-b py-2">{s.name} - {s.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffManagement;
