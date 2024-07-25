import React from 'react'
import styles from './LegendItem.module.css'

const LegendItem = ({ radio, showPrevious }) => {
  return (
    <>
      <div className={styles.legendContainer}>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-yellow-5)' }}></span>
          <p className={styles.legendText}>Esperado</p>
        </div>

        {radio === 'nao-mostrar' &&
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-blue-2)' }}></span>
            <p className={styles.legendText}>Adquirido</p>
          </div>
        }

        {radio === 'mostrar' &&
          <>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-blue-2)' }}></span>
              <p className={styles.legendText}>Adquirido</p>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-pink)' }}></span>
              <p className={styles.legendText}>Adquirido Parcial</p>
            </div>
          </>
        }

        {radio === 'somar' &&
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-blue-2)' }}></span>
            <p className={styles.legendText}>Adquirido e Parcial</p>
          </div>
        }

        {showPrevious && radio === 'nao-mostrar' &&
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-pink)' }}></span>
            <p className={styles.legendText}>Adquirido Anterior</p>
          </div>
        }

        {showPrevious && radio === 'mostrar' &&
          <>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-blue-5)' }}></span>
              <p className={styles.legendText}>Adquirido Anterior</p>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-yellow-2)' }}></span>
              <p className={styles.legendText}>Adquirido Parcial Anterior</p>
            </div>
          </>
        }

        {showPrevious && radio === 'somar' &&
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-pink)' }}></span>
            <p className={styles.legendText}>Adquirido e Parcial Anterior</p>
          </div>
        }

      </div>
    </>
  )
}

export default LegendItem