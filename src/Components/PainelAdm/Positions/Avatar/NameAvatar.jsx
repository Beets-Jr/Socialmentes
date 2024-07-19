import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name = '', size) {
  if (!name) {
    return {};
  }

  const nameParts = name.split(' ');
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[1][0]}`
    : nameParts[0].slice(0, 2);

  return {
    sx: {
      bgcolor: stringToColor(name),
      margin: 'auto',
      border: '2px solid var(--color-gray-3)',
      width: size,
      height: size,
    },
    children: initials,
  };
}

const NameAvatar = ({ name = 'NN', size }) => (
  <Avatar {...stringAvatar(name, size)} />
);

NameAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string.isRequired,
};

export default NameAvatar;
