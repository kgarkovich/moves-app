import { UpcomingMovies } from './upcoming-movies';
import { PopularMovies } from './popular-movies';
import { AllMovies } from './all-movies';

export const Dashboard = () => {
    return (
        <div>
            <PopularMovies />
            <UpcomingMovies />
            <AllMovies />
        </div>
    )
}
