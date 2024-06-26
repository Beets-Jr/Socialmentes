import Avatar from '@mui/material/Avatar';

const PhotoAvatar = ({ photoUrl, altText, size }) =>  (
    <Avatar // recebe a foto de perfil 
        alt={`${altText}'s profile picture`}
        src={photoUrl}
        sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', width:size, height:size, }}
    />
);

export default PhotoAvatar;