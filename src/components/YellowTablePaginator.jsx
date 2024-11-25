import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Input,
} from '@mui/material';
import Image from 'next/image'; // Import optimized Image component

const YellowTablePaginator = ({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const [checkedByUser, setCheckedByUser] = useState('N/A');

  // Define fields
  const fields = useMemo(() => [
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
  ], []);

  // Use a single reducer to manage form state
  const [formState, dispatch] = useReducer((state, action) => ({
    ...state,
    ...action,
  }), fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));

  const handleInputChange = (field, value) => {
    dispatch({ [field]: value });
  };

  const fetchCheckedByData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCheckedByData();
  }, [fetchCheckedByData]);

  useEffect(() => {
    setVisibleRows([]);
    data?.forEach((_, index) => {
      setTimeout(() => setVisibleRows((prev) => [...prev, index]), index * 50);
    });
    return () => setVisibleRows([]);
  }, [data]);

  useEffect(() => {
    if (selectedRow) {
      dispatch(fields.reduce((acc, field) => ({
        ...acc,
        [field]: selectedRow[field] || '',
      }), {}));
    }
  }, [selectedRow, fields]);

  const handleEditClick = useCallback((row) => setSelectedRow(row), []);
  const handleCloseModal = useCallback(() => setSelectedRow(null), []);

  const handleApprove = useCallback(() => {
    if (selectedRow) {
      console.log('Approve data:', formState);
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [selectedRow, formState]);

  const handleReject = useCallback(() => {
    if (selectedRow) {
      console.log('Reject data:', formState);
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [selectedRow, formState]);

  const getStatusText = useCallback(
    (status) => (status === 'Approved' || status === 'Rejected' ? status : 'Pending'),
    []
  );

  if (!data || data.length === 0) {
    return (
      <Paper className="p-4 text-center">
        <h4>No data available</h4>
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
                  <TableCell>{getStatusText(row.status)}</TableCell>
                  <TableCell>{checkedByUser}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(row)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRow && (
        <Modal open={!!selectedRow} onClose={handleCloseModal}>
          <Paper className="p-4">
            <h4>Edit Row</h4>
            {fields.map((field) => (
              <div key={field}>
                <label>{field.replace('_', ' ')}</label>
                <Input
                  value={formState[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={handleReject}>Reject</Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </Paper>
        </Modal>
      )}
    </Paper>
  );
};

export default YellowTablePaginator;
