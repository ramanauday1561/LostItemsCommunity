import React from 'react';
import { motion } from 'framer-motion';

// Page transition animation variants
const pageVariants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
