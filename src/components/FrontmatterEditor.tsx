import React, { useState, useEffect } from 'react';
import { MarkdownFile, Frontmatter } from '../types';
import { Plus, Trash2, Save } from 'lucide-react';

interface FrontmatterEditorProps {
  file: MarkdownFile;
  onSave: (updatedFrontmatter: Frontmatter) => void;
}

type FieldType = 'string' | 'number' | 'boolean' | 'array';

interface FieldDef {
  key: string;
  value: any;
  type: FieldType;
}

export function FrontmatterEditor({ file, onSave }: FrontmatterEditorProps) {
  const [fields, setFields] = useState<FieldDef[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<FieldType>('string');

  useEffect(() => {
    const initialFields = Object.entries(file.frontmatter).map(([key, value]) => {
      let type: FieldType = 'string';
      if (typeof value === 'number') type = 'number';
      else if (typeof value === 'boolean') type = 'boolean';
      else if (Array.isArray(value)) type = 'array';
      
      return { key, value, type };
    });
    setFields(initialFields);
  }, [file]);

  const handleFieldChange = (index: number, newValue: any) => {
    const newFields = [...fields];
    newFields[index].value = newValue;
    setFields(newFields);
  };

  const handleTypeChange = (index: number, newType: FieldType) => {
    const newFields = [...fields];
    const field = newFields[index];
    field.type = newType;
    
    // Convert value based on new type
    if (newType === 'string') field.value = String(field.value);
    else if (newType === 'number') field.value = Number(field.value) || 0;
    else if (newType === 'boolean') field.value = Boolean(field.value);
    else if (newType === 'array') field.value = Array.isArray(field.value) ? field.value : [field.value];
    
    setFields(newFields);
  };

  const addField = () => {
    if (!newKey.trim() || fields.some(f => f.key === newKey.trim())) return;
    
    let defaultValue: any = '';
    if (newType === 'number') defaultValue = 0;
    if (newType === 'boolean') defaultValue = false;
    if (newType === 'array') defaultValue = [];

    setFields([...fields, { key: newKey.trim(), value: defaultValue, type: newType }]);
    setNewKey('');
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedFrontmatter: Record<string, any> = {};
    fields.forEach(f => {
      updatedFrontmatter[f.key] = f.value;
    });
    onSave(updatedFrontmatter as Frontmatter);
  };

  return (
    <div className="flex flex-col h-full bg-bg">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-medium text-text-muted">Frontmatter Editor</h3>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-3 py-1.5 bg-text text-bg hover:opacity-90 transition-opacity rounded-md text-sm font-medium"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex items-start space-x-2 border border-border p-3 bg-surface rounded-md">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={field.key}
                  readOnly
                  className="bg-transparent text-sm font-mono text-text-muted w-1/3 focus:outline-none"
                />
                <select 
                  value={field.type}
                  onChange={(e) => handleTypeChange(index, e.target.value as FieldType)}
                  className="bg-bg border border-border text-sm font-mono text-text-muted p-1 rounded-md focus:outline-none focus:border-primary"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="array">Array</option>
                </select>
              </div>
              
              {field.type === 'string' && (
                <input 
                  type="text" 
                  value={field.value} 
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className="w-full bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md"
                />
              )}
              
              {field.type === 'number' && (
                <input 
                  type="number" 
                  value={field.value} 
                  onChange={(e) => handleFieldChange(index, Number(e.target.value))}
                  className="w-full bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md"
                />
              )}
              
              {field.type === 'boolean' && (
                <select 
                  value={String(field.value)} 
                  onChange={(e) => handleFieldChange(index, e.target.value === 'true')}
                  className="w-full bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              )}

              {field.type === 'array' && (
                <input 
                  type="text" 
                  value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                  onChange={(e) => handleFieldChange(index, e.target.value.split(',').map(s => s.trim()))}
                  placeholder="Comma separated values"
                  className="w-full bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md"
                />
              )}
            </div>
            
            <button 
              onClick={() => removeField(index)}
              className="p-2 text-text-muted hover:text-primary transition-colors rounded-md hover:bg-bg"
              title="Remove field"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {/* Add new field */}
        <div className="flex items-center space-x-2 border border-border p-3 border-dashed mt-6 rounded-md">
          <input 
            type="text" 
            placeholder="New Key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="flex-1 bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md"
          />
          <select 
            value={newType}
            onChange={(e) => setNewType(e.target.value as FieldType)}
            className="bg-bg border border-border text-sm font-mono text-text-muted p-2 rounded-md focus:outline-none focus:border-primary"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
          </select>
          <button 
            onClick={addField}
            disabled={!newKey.trim()}
            className="p-2 bg-surface text-text hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
