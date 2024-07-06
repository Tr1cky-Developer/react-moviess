import React from 'react';
import { Preloader } from './Preloader';

class Search extends React.Component {
	state = {
		search: '',
		type: 'all',
	};

	handleKey = e => {
		if (e.key === 'Enter') {
			this.props.searchMovies(this.state.search, this.state.type);
		}
	};

	handleFilter = e => {
		this.setState(
			() => ({ type: e.target.dataset.type }),
			() => {
				this.props.searchMovies(this.state.search, this.state.type);
			}
		);
	};

	render() {
		return (
			<div className='row'>
				<div className='input-field '>
					<input
						placeholder='search'
						type='search'
						className='validate'
						value={this.state.search}
						onChange={e => this.setState({ search: e.target.value })}
						onKeyDown={this.handleKey}
					/>
					<button
						className='btn search-btn'
						onClick={() =>
							this.state.search?.trim() ? (
								this.props.searchMovies(this.state.search, this.state.type)
							) : (
								<Preloader />
							)
						}
					>
						Search
					</button>
					<div>
						<label>
							<input
								className='with-gap'
								name='type'
								type='radio'
								data-type='all'
								onChange={this.handleFilter}
								checked={this.state.type === 'all'}
							/>
							<span>All</span>
						</label>
						<label>
							<input
								className='with-gap'
								name='type'
								type='radio'
								data-type='movie'
								onChange={this.handleFilter}
								checked={this.state.type === 'movie'}
							/>
							<span>Movies</span>
						</label>
						<label>
							<input
								className='with-gap'
								name='type'
								type='radio'
								data-type='series'
								onChange={this.handleFilter}
								checked={this.state.type === 'series'}
							/>
							<span>Series</span>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

export { Search };
