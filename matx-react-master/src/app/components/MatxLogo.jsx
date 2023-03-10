import useSettings from 'app/hooks/useSettings';
import logo from '../../images/logo.png'
const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img width={30}  src={logo} alt='logo'/>
  );
};

export default MatxLogo;
