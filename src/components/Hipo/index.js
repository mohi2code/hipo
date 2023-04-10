import { motion } from "framer-motion";

export const HipoLogo = (props) => (
  <svg
    width={104}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M93.287 15.79c-11.31-.313-13.964-3.317-14.533-5.09l-.01-.104-.043-.115c-.02-.114-.052-.26-.073-.396-.01-.125-.022-.25-.01-.344.873-.866 1.284-2.055 1.073-3.254a3.823 3.823 0 0 0-3.59-3.14c-1.065-.051-2.16.355-2.908 1.065-.115.114-.231.229-.326.354l.042-.24c.01-.094.021-.187.021-.281C72.93 1.909 71.013 0 68.644 0c-2.212 0-4.16 1.982-4.276 4.286-1.19.188-2.159.595-3.275 1.127-3.075-1.659-7.204-3.046-11.953-4.015C44.759.5 40.05.01 35.88.01c-6.929 0-14.1 1.659-21.915 5.069-1.748.761-3.75 1.72-5.519 3.077l-.063.03-2.4-2.596-.054-.052a3.46 3.46 0 0 0-2.4-1.012 3.45 3.45 0 0 0-2.476.96 3.428 3.428 0 0 0-.095 4.85l2.95 3.285c-.748.98-1.486 2.117-1.78 2.69-.021.032-.032.073-.053.105A20.201 20.201 0 0 0 .495 24.3c0 3.9 1.159 7.979 3.275 11.503 2.328 3.88 4.666 6.258 7.31 7.437l.062 6.34c.011.772.517 1.45 1.254 1.68 1.116.354 3.622.74 7.319.74 3.686 0 6.203-.375 7.32-.74a1.793 1.793 0 0 0 1.253-1.7l-.011-4.631c0-.136.053-.26.158-.344a.463.463 0 0 1 .369-.094c1.58.313 4.507.824 6.276.824 4.929 0 13.228-.782 17.714-1.95a.721.721 0 0 1 .632.125c.19.146.284.344.284.584v5.486c0 .771.506 1.46 1.243 1.7 1.106.354 3.591.73 7.235.73 3.654 0 6.13-.376 7.235-.73a1.783 1.783 0 0 0 1.243-1.7V42.55c0-.292.179-.563.453-.688a5.236 5.236 0 0 0 2.295-2.044c2.602.448 5.635 1.095 8.678 2.044 24.423 7.54 28.825-25.583 11.195-26.073Z"
      fill="#FF0C0C"
    />
  </svg>
);

export const AnimatedHipoLogo = (props) => (
  <svg
    style={{ overflow: 'visible' }}
    width={104}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.path
      stroke="#FFFFFF"
      strokeWidth={2}
      initial={{ pathLength: 1 }}
      animate={{ pathLength: 0 }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
      }}
      d="M93.287 15.79c-11.31-.313-13.964-3.317-14.533-5.09l-.01-.104-.043-.115c-.02-.114-.052-.26-.073-.396-.01-.125-.022-.25-.01-.344.873-.866 1.284-2.055 1.073-3.254a3.823 3.823 0 0 0-3.59-3.14c-1.065-.051-2.16.355-2.908 1.065-.115.114-.231.229-.326.354l.042-.24c.01-.094.021-.187.021-.281C72.93 1.909 71.013 0 68.644 0c-2.212 0-4.16 1.982-4.276 4.286-1.19.188-2.159.595-3.275 1.127-3.075-1.659-7.204-3.046-11.953-4.015C44.759.5 40.05.01 35.88.01c-6.929 0-14.1 1.659-21.915 5.069-1.748.761-3.75 1.72-5.519 3.077l-.063.03-2.4-2.596-.054-.052a3.46 3.46 0 0 0-2.4-1.012 3.45 3.45 0 0 0-2.476.96 3.428 3.428 0 0 0-.095 4.85l2.95 3.285c-.748.98-1.486 2.117-1.78 2.69-.021.032-.032.073-.053.105A20.201 20.201 0 0 0 .495 24.3c0 3.9 1.159 7.979 3.275 11.503 2.328 3.88 4.666 6.258 7.31 7.437l.062 6.34c.011.772.517 1.45 1.254 1.68 1.116.354 3.622.74 7.319.74 3.686 0 6.203-.375 7.32-.74a1.793 1.793 0 0 0 1.253-1.7l-.011-4.631c0-.136.053-.26.158-.344a.463.463 0 0 1 .369-.094c1.58.313 4.507.824 6.276.824 4.929 0 13.228-.782 17.714-1.95a.721.721 0 0 1 .632.125c.19.146.284.344.284.584v5.486c0 .771.506 1.46 1.243 1.7 1.106.354 3.591.73 7.235.73 3.654 0 6.13-.376 7.235-.73a1.783 1.783 0 0 0 1.243-1.7V42.55c0-.292.179-.563.453-.688a5.236 5.236 0 0 0 2.295-2.044c2.602.448 5.635 1.095 8.678 2.044 24.423 7.54 28.825-25.583 11.195-26.073Z"
      fill="#FF0C0C"
    />
  </svg>
);
