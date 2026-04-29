import { useNavigate } from 'react-router-dom';

/**
 * Returns a function that navigates to the contact section without a full
 * page reload and smoothly scrolls to it, pre-filling the enquiry textarea.
 */
export const useNavigateToContact = () => {
    const navigate = useNavigate();

    return (intent: string) => {
        navigate(`/?intent=${encodeURIComponent(intent)}`, { replace: false });
        
        // Wait longer for the React DOM tree to fully switch routes, construct the landing page, and mount the contact section
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };
};
