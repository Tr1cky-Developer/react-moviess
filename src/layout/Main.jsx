import React from 'react';
import { Movies } from '../components/Movies';
import { Search } from '../components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
	state = {
		movies: [],
	};

	componentDidMount() {
		fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
			.then(response => response.json())
			.then(data => {
				if (data.Search) {
					this.setState({ movies: data.Search });
				} else {
					this.setState({ movies: [] });
				}
			})
			.catch(err => {
				console.error(err);
			});
	}

	searchMovies = (str, type = 'all') => {
		fetch(
			`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
				type !== 'all' ? `&type=${type}` : ''
			}`
		)
			.then(response => response.json())
			.then(data => {
				if (data.Search) {
					this.setState({ movies: data.Search });
				} else {
					this.setState({ movies: [] });
				}
			})
			.catch(err => {
				console.error(err);
			});
	};

	render() {
		const { movies } = this.state;
		return (
			<main className='container content'>
				<Search searchMovies={this.searchMovies} />
				{movies.length > 0 ? (
					<Movies movies={movies} />
				) : (
					<h4>Nothing found</h4>
				)}
			</main>
		);
	}
}

export { Main };
