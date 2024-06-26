import Avatar from '@mui/material/Avatar';

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
  
function stringAvatar({name, size}) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            margin: 'auto', border: '2px solid var(--color-gray-3)', 
            width:size, height: size
        },
        children: `${name.split(' ')[0][0]}${name.split(' ').length > 1 ? name.split(' ')[1][0] : name.split(' ')[0][1]}`,
    };
}

const NameAvatar = ({name}) =>  (
    <Avatar {...stringAvatar(name)} />
);

export default NameAvatar;