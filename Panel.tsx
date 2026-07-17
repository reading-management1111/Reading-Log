// src/components/Panel.tsx
import type { ReactNode } from 'react';

type PanelProps = {
  title: string;
  children: ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <div className="panel">
      <h2 className="panel-title">{title}</h2>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;