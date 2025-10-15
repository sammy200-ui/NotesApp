const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ color: 'white', marginTop: '1rem', fontSize: '1.1rem' }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
