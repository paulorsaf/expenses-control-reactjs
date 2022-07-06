import './Loading.css';

function Loading() {
    return (
        <div
            className='loading-overlay centralize'
            data-testid="loading">
            Loading...
        </div>
    )
}

export default Loading;