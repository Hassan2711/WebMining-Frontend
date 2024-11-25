'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BACKEND_URL } from '@/components/ui/Login';
import { LabelInputContainer } from '@/components/ui/Login';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import BigModal from './ui/BigModal';
import ApprovedButton from './ApprovedButton';
import RejectButton from './RejectButton';

export const submitData = async (id, fields) => {
  try {
    const response = await fetch(`${BACKEND_URL}/scraper/yellowpages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...fields, status: 'Approved' }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('Error:', await response.json());
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export const submitRejectData = async (id, fields) => {
  try {
    const response = await fetch(`${BACKEND_URL}/scraper/yellowpages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...fields, status: 'Rejected' }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('Error:', await response.json());
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const YellowTablePaginator = ({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onSaveChanges,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const [checkedByUser, setCheckedByUser] = useState('N/A');

  const fields = [
    'editName',
    'phone',
    'address',
    'link',
    'neighborhoods',
    'claimed',
    'categories',
    'other_info',
    'other_links',
    'email',
    'regular_hours',
    'general_info',
    'services_products',
    'amenities',
    'languages',
    'aka',
    'social_links',
    'photos_url',
  ];
  const stateHandlers = fields.reduce((acc, field) => {
    acc[field] = useState('');
    return acc;
  }, {});

  useEffect(() => {
    const fetchCheckedByData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/checkedby`);
        if (!response.ok) {
          throw new Error('Failed to fetch checked by data');
        }
        const data = await response.json();
        setCheckedByUser(data.yellowpages || 'N/A');
      } catch (error) {
        console.error('Error fetching checked by data:', error);
        setCheckedByUser('N/A');
      }
    };

    fetchCheckedByData();
  }, []);

  useEffect(() => {
    setVisibleRows([]);
    data?.forEach((_, index) => {
      setTimeout(() => setVisibleRows((prev) => [...prev, index]), index * 0);
    });
    return () => setVisibleRows([]);
  }, [data]);
  console.log(data);

  useEffect(() => {
    if (selectedRow) {
      fields.forEach((field) => {
        stateHandlers[field][1](selectedRow[field] || '');
      });
    }
  }, [selectedRow]);

  const handleEditClick = (row) => setSelectedRow(row);
  const handleCloseModal = () => setSelectedRow(null);

  const handleApprove = async () => {
    if (selectedRow) {
      const updatedFields = fields.reduce(
        (acc, field) => ({ ...acc, [field]: stateHandlers[field][0] }),
        {}
      );
      await submitData(selectedRow.id, updatedFields);
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  const handleReject = async () => {
    if (selectedRow) {
      const updatedFields = fields.reduce(
        (acc, field) => ({ ...acc, [field]: stateHandlers[field][0] }),
        {}
      );
      await submitRejectData(selectedRow.id, updatedFields);
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  const getStatusText = (status) =>
    status === 'Approved' || status === 'Rejected' ? status : 'N/A';

  if (!data || data.length === 0) {
    return (
      <Paper className="p-4 text-center">
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold">
          No data available
        </h4>
        <p>Please check back later</p>
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="left">Checked By</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) =>
              visibleRows.includes(index) ? (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.categories || 'N/A'}</TableCell>
                  <TableCell>{row.source || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-4 items-center">
                      <p className="capitalize">{getStatusText(row.status)}</p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`lucide lucide-circle-check ${
                            row.status === 'Rejected' && 'bg-red-500'
                          } ${row.status === 'Approved' && 'bg-green-500'} ${
                            getStatusText(row.status) === 'N/A' && 'bg-gray-500'
                          } rounded-full text-white`}
                        >
                          <circle cx={12} cy={12} r={10} />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-center font-semibold mx-auto">
                    {checkedByUser}
                  </TableCell>
                  <TableCell>
                    <div onClick={() => handleEditClick(row)}>
                      <BigModal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-4 ">
                          {fields.map((field) => (
                            <LabelInputContainer key={field} className="mb-1">
                              <Label htmlFor={field} className="text-xs">
                                {field.replace('_', ' ')}
                              </Label>
                              <Input
                                id={field}
                                value={stateHandlers[field][0]}
                                onChange={(e) =>
                                  stateHandlers[field][1](e.target.value)
                                }
                                placeholder={`Enter ${field}`}
                                type="text"
                                className="text-xs"
                              />
                            </LabelInputContainer>
                          ))}
                        </div>
                      </BigModal>
                    </div>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default YellowTablePaginator;
