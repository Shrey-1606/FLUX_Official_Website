"use client";
import { useLabs } from "@/context/LabsContext";
import { X, Minus, Maximize2, ExternalLink } from "lucide-react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import styles from "./Labs.module.css";
import LabsContent from "./LabsContent";

export default function LabsWindow() {
  const { 
    isOpen, 
    isMinimized, 
    isMaximized, 
    toggleOpen, 
    setMinimized, 
    setMaximized 
  } = useLabs();
  
  const dragControls = useDragControls();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMinimized(false);
    setMaximized(false);
    toggleOpen(); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={{ originX: 0.5, originY: 1 }} 

          initial={{ 
            opacity: 0, 
            scaleX: 0.1,
            scaleY: 0.05  
          }}
          animate={{ 
            opacity: 1, 
            scaleX: 1, 
            scaleY: 1 
          }}
          exit={{ 
            opacity: 0, 
            scaleX: 0.1, 
            scaleY: 0.05, 
            transition: { duration: 0.25, ease: "easeIn" } 
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 280 
          }}
          
          drag={!isMaximized && !isMinimized} 
          dragControls={dragControls}
          dragListener={false} 
          dragMomentum={false}
          className={`
            ${styles.windowContainer} 
            ${isMaximized ? styles.maximized : ""} 
            ${isMinimized ? styles.minimized : ""}
          `}
          onWheel={(e) => e.stopPropagation()}
        >
          <div 
            className={styles.titleBar} 
            onPointerDown={(e) => !isMinimized && !isMaximized && dragControls.start(e)}
            style={{ 
              cursor: isMaximized ? "default" : isMinimized ? "pointer" : "grab",
              touchAction: "none" 
            }}
            onClick={() => isMinimized && setMinimized(false)}
          >
            <div className={styles.controls}>
              <div className={`${styles.dot} ${styles.close}`} onClick={handleClose}>
                <X size={8} strokeWidth={4} />
              </div>
              
              {!isMinimized && (
                <div 
                  className={`${styles.dot} ${styles.minimize}`} 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setMaximized(false); 
                    setMinimized(true); 
                  }}
                >
                  <Minus size={8} strokeWidth={4} />
                </div>
              )}

              <div 
                className={`${styles.dot} ${styles.maximize}`} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (isMinimized) setMinimized(false);
                  else setMaximized(!isMaximized);
                }}
              >
                {isMinimized ? <ExternalLink size={8} strokeWidth={4} /> : <Maximize2 size={8} strokeWidth={4} />}
              </div>
            </div>

            <span className={styles.windowTitle}>
              {isMinimized ? "Restore Flux Labs" : "Flux Labs v1.0"}
            </span>
          </div>

          {!isMinimized && (
            <div className={styles.contentArea}>
              <LabsContent />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}