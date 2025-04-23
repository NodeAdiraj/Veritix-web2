import './Home.css';
import Imgslider from './Imgslider';
import Viewers from './Viewers';
const Home = () => {
    return (
        <div className='home-container'>
            <Imgslider />
            <Viewers />
            <h1>Second</h1>
        </div>
    );
};
export default Home;