import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ProfileName({ text = "NA" }) {
  // Ensure text is a string and not null or undefined
  const safeText = text ?? "NA";

  // Extract initials or a part of the string for display
  const UserName = safeText.length > 2 ? safeText.slice(0, 2) : safeText;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: 'white', color: '#2e3940' }}>
        {UserName}
      </Avatar>
    </Stack>
  );
}
