module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths to your source files
  ],
  theme: {
    extend: {
      colors: {
        maintext: '#AFA3FF',
        textColor: {
          'theme-primary': (theme) => theme('colors.primary'),
          'theme-secondary': (theme) => theme('colors.secondary'),
          // Add more color classes as needed
        },
        backgroundColor: {
          'theme-primary': (theme) => theme('colors.primary'),
          'theme-secondary': (theme) => theme('colors.secondary'),
          // Add more color classes as needed
        },
      },
      boxShadow: {
        // Your demo box shadows (optional)
        demo: '0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
        inner:
          'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
      },
    },
    body: {
      light: {
        backgroundColor: '#f8f9fa', // Adjust to your desired light background color
        color: '#343a40', // Adjust to your desired light text color
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)', // Optional subtle inset shadow
      },
      dark: {
        backgroundColor: '#1f2937', // Adjust to your desired dark background color
        color: '#fff', // Adjust to your desired dark text color
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Optional subtle box shadow
      },
    },
  },
  plugins: [],
};
