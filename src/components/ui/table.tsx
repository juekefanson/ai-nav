import * as React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>;
}
export function TableHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <thead className={className}>{children}</thead>;
}
export function TableBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tbody className={className}>{children}</tbody>;
}
export function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b transition-colors hover:bg-muted/50 ${className}`}>{children}</tr>;
}
export function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <th className={`h-12 px-4 text-left align-middle font-medium ${className}`}>{children}</th>;
}
export function TableCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`p-4 align-middle ${className}`}>{children}</td>;
}
