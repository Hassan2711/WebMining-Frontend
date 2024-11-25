import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Memoize the fields array to prevent recreation on every render
  const fields = useMemo(
    () => [
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
    ],
    []
  );

  // Create state handlers for each field
  const stateHandlers = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field] = useState('');
      return acc;
    }, {});
  }, [fields]);

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
      fields.forEach((field) => {
        stateHandlers[field][1](selectedRow[field] || '');
      });
    }
  }, [selectedRow, fields, stateHandlers]);

  const handleEditClick = useCallback((row) => setSelectedRow(row), []);
  const handleCloseModal = useCallback(() => setSelectedRow(null), []);

  const handleApprove = useCallback(async () => {
    if (selectedRow) {
      const updatedFields = fields.reduce(
        (acc, field) => ({ ...acc, [field]: stateHandlers[field][0] }),
        {}
      );
      console.log('Approve data:', updatedFields);
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [selectedRow, fields, stateHandlers]);

  const handleReject = useCallback(async () => {
    if (selectedRow) {
      const updatedFields = fields.reduce(
        (acc, field) => ({ ...acc, [field]: stateHandlers[field][0] }),
        {}
      );
      console.log('Reject data:', updatedFields);
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [selectedRow, fields, stateHandlers]);

  const getStatusText = useCallback(
    (status) =>
      status === 'Approved' || status === 'Rejected' ? status : 'Pending',
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
                  value={stateHandlers[field][0]}
                  onChange={(e) => stateHandlers[field][1](e.target.value)}
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
