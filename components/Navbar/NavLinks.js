// NavLinks.js
import { client } from '@/lib/sanity'; // Adjust path to your Sanity client

// Function that returns NavLink array with blog count
export const getNavLinks = async () => {
  let blogCount = 0;
  
  try {
    // Fetch blog count from Sanity
    const query = `count(*[_type == "blog"])`;
    blogCount = await client.fetch(query);
  } catch (error) {
    console.error('Error fetching blog count:', error);
    blogCount = 0; // or keep as null
  }

  return [
    {
      label: 'Resume',
      url: '/resume'
    },
    {
      label: 'Portfolio', 
      url: '/portfolio'
    },
    {
      label: 'Blog',
      url: '/blog',
      count: blogCount
    },
    {
      label: 'Say Hello',
      url: '/contact',
      colored: true
    },
  ];
};

// Keep the original export for backward compatibility (without count)
export const NavLink = [
  {
    label: 'Resume',
    url: '/resume'
  },
  {
    label: 'Portfolio',
    url: '/portfolio'
  },
  {
    label: 'Blog',
    url: '/blog',
    count: null
  },
  {
    label: 'Say Hello',
    url: '/contact',
    colored: true
  },
];