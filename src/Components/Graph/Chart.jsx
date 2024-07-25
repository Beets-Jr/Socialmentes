import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Typography, useMediaQuery } from '@mui/material';
import styles from './Chart.module.css';
import LegendItem from './LegendItem';

const Chart = ({ data, radio, showPrevious }) => {
  const len = data.length * 200;
  const isMobile = useMediaQuery('(max-width: 1000px)');
  if (!isMobile) {
    return (
      <div className={styles.chartWrapper}>
        <div className={styles.chartContainer} style={{ height: len }}>
          <Typography align="center" gutterBottom
            sx={{
              color: 'var(--color-blue-3)',
              fontSize: '24px',
              fontWeight: '500'
            }}>
            Desempenho Checklist Currículo Denver
          </Typography>
          <ResponsiveContainer width="90%" height="95%">
            <BarChart layout="vertical" data={data} margin={{ top: 20, right: 40, left: 80, bottom: 10 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="0 0" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="Esperado" fill="var(--color-yellow-5)" />
              {radio === 'nao-mostrar' && <Bar dataKey="Adquirido" fill="var(--color-blue-2)" />}
              {radio === 'mostrar' &&
                <>
                  <Bar dataKey="Adquirido" fill="var(--color-blue-2)" />
                  <Bar dataKey="Adquirido Parcial" fill="var(--color-pink)" />
                </>
              }
              {radio === 'somar' && <Bar dataKey="Adquirido e Parcial" fill="var(--color-blue-2)" />}

              {showPrevious &&
                radio === 'nao-mostrar' && <Bar dataKey="Adquirido Anterior" fill="var(--color-pink)" />
              }
              {showPrevious &&
                radio === 'mostrar' &&
                <>
                  <Bar dataKey="Adquirido Anterior" fill="var(--color-blue-5)" />
                  <Bar dataKey="Adquirido Parcial Anterior" fill="var(--color-yellow-2)" />
                </>
              }
              {showPrevious &&
                radio === 'somar' && <Bar dataKey="Adquirido e Parcial Anterior" fill="var(--color-pink)" />
              }
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={{ stroke: '#333', strokeWidth: 2 }}
                width={100}
                interval={0}
                label={{
                  value: 'Nível 1: 1a-1a 6meses / Nível 2: 1a6meses-2a / Nível 3: 2a-3a / Nível 4: 3a-4a', angle: -90, position: 'insideLeft', offset: -70,
                  style: {
                    textAnchor: 'middle',
                    fill: 'var(--color-gray-4)'
                  }
                }}
                tick={{
                  fill: 'black',
                  fontSize: '15px',
                  fontWeight: '500',
                  width: 150,
                  wordBreak: 'break-all',
                }}
              />
            </BarChart>
          </ResponsiveContainer>
          <LegendItem radio={radio} showPrevious={showPrevious} />
        </div>
      </div >
    );
  } else {
    return (
      <div className={styles.chartWrapper}>
        <div className={styles.chartContainer} style={{ minWidth: len * 1.6, height: 600 }}>
          <Typography align="center" gutterBottom
            sx={{
              color: 'var(--color-blue-3)',
              fontSize: '24px',
              fontWeight: '500'
            }}>
            Desempenho Checklist Currículo Denver
          </Typography>
          <ResponsiveContainer width="90%" height="95%">
            <BarChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>

              <CartesianGrid stroke="#ccc" strokeDasharray="0 0" horizontal={false} />

              <XAxis dataKey="name" tickLine={false}
                tick={{
                  fill: 'black',
                  fontSize: '15px',
                  fontWeight: '500',
                  width: 150,
                  wordBreak: 'break-all',
                }}
              />

              <Tooltip />
              <Bar dataKey="Esperado" fill="var(--color-yellow-5)" />
              {radio === 'nao-mostrar' && <Bar dataKey="Adquirido" fill="var(--color-blue-2)" />}
              {radio === 'mostrar' &&
                <>
                  <Bar dataKey="Adquirido" fill="var(--color-blue-2)" />
                  <Bar dataKey="Adquirido Parcial" fill="var(--color-pink)" />
                </>
              }
              {radio === 'somar' && <Bar dataKey="Adquirido e Parcial" fill="var(--color-blue-2)" />}

              {showPrevious &&
                radio === 'nao-mostrar' && <Bar dataKey="Adquirido Anterior" fill="var(--color-pink)" />
              }
              {showPrevious &&
                radio === 'mostrar' &&
                <>
                  <Bar dataKey="Adquirido Anterior" fill="var(--color-blue-5)" />
                  <Bar dataKey="Adquirido Parcial Anterior" fill="var(--color-yellow-2)" />
                </>
              }
              {showPrevious &&
                radio === 'somar' && <Bar dataKey="Adquirido e Parcial Anterior" fill="var(--color-pink)" />
              }
              <YAxis
                label={{
                  value: 'Nível 1: 1a-1a 6meses / Nível 2: 1a6meses-2a / Nível 3: 2a-3a / Nível 4: 3a-4a', angle: -90, position: 'insideLeft', offset: 10,
                  style: {
                    textAnchor: 'middle',
                    fill: 'var(--color-gray-4)'
                  }
                }}
                tickLine={false}
                axisLine={{ stroke: '#333', strokeWidth: 2 }}
                width={100}
                interval={0}
              />
            </BarChart>
          </ResponsiveContainer>
          <LegendItem radio={radio} showPrevious={showPrevious} />
        </div>
      </div >
    );
  }
}

export default Chart