import pandas as pd
import numpy as np

def detect_date_columns(df: pd.DataFrame) -> list:
    date_cols = []
    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            date_cols.append(col)
        elif df[col].dtype == 'object':
            try:
                # Sample non-null values to check if they parse as dates
                sample = df[col].dropna().head(10)
                if not sample.empty:
                    # check if string actually looks like a date/time (contains numbers)
                    # purely text might be incorrectly parsed by dateutil in rare cases, but this is a heuristic
                    pd.to_datetime(sample, format=None, errors='raise')
                    date_cols.append(col)
            except Exception:
                pass
    return date_cols

def generate_analytics(df: pd.DataFrame):
    """
    Analyzes the dataframe and returns summary and chart metadata.
    """
    # 1. Detect Column Types
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    all_categorical = df.select_dtypes(include=['object', 'category']).columns.tolist()
    
    date_cols = detect_date_columns(df)
    
    # Filter date columns out of categorical
    categorical_cols = [c for c in all_categorical if c not in date_cols]
    
    charts = []
    
    # 2. Rule: Categorical + Numeric = Bar Chart
    if categorical_cols and numeric_cols:
        # Find a categorical column with a reasonable number of unique values
        best_cat = None
        for col in categorical_cols:
            if df[col].nunique() < 20:
                best_cat = col
                break
        if not best_cat:
            best_cat = categorical_cols[0]
            
        num_col = numeric_cols[0]
        
        grouped = df.groupby(best_cat)[num_col].sum().reset_index()
        grouped = grouped.sort_values(by=num_col, ascending=False).head(10)
        
        # Replace NaN/Infinity
        grouped = grouped.replace([np.inf, -np.inf], np.nan).dropna()
        
        chart_data = grouped.rename(columns={best_cat: "name", num_col: "value"}).to_dict(orient="records")
        
        charts.append({
            "type": "bar",
            "title": f"{num_col} by {best_cat}",
            "xKey": "name",
            "yKey": "value",
            "data": chart_data
        })
        
    # 3. Rule: Date + Numeric = Line Chart
    if date_cols and numeric_cols:
        date_col = date_cols[0]
        # Pick a different numeric col if possible
        num_col = numeric_cols[1] if len(numeric_cols) > 1 else numeric_cols[0]
        
        df_date = df.copy()
        df_date[date_col] = pd.to_datetime(df_date[date_col], errors='coerce')
        df_date = df_date.dropna(subset=[date_col])
        
        grouped_date = df_date.groupby(df_date[date_col].dt.date)[num_col].sum().reset_index()
        grouped_date = grouped_date.sort_values(by=date_col)
        
        # Convert date back to string for JSON serialization
        grouped_date[date_col] = grouped_date[date_col].astype(str)
        grouped_date = grouped_date.replace([np.inf, -np.inf], np.nan).dropna()
        
        chart_data = grouped_date.rename(columns={date_col: "name", num_col: "value"}).to_dict(orient="records")
        
        charts.append({
            "type": "line",
            "title": f"{num_col} Trend",
            "xKey": "name",
            "yKey": "value",
            "data": chart_data
        })
        
    # 4. Rule: Categorical Distribution = Pie Chart
    if categorical_cols:
        # Pick the last categorical column to vary the data
        cat_col = categorical_cols[-1]
        
        val_counts = df[cat_col].value_counts().head(5).reset_index()
        val_counts.columns = ["name", "value"]
        
        chart_data = val_counts.to_dict(orient="records")
        
        charts.append({
            "type": "pie",
            "title": f"{cat_col} Distribution",
            "data": chart_data
        })
        
    # Add statistics to summary for AI processing
    stats = {}
    if numeric_cols:
        desc = df[numeric_cols].describe().replace([np.inf, -np.inf, np.nan], None).to_dict()
        stats['numeric_summary'] = desc
        
    if categorical_cols:
        cat_desc = df[categorical_cols].describe().replace([np.inf, -np.inf, np.nan], None).to_dict()
        stats['categorical_summary'] = cat_desc

    summary = {
        "rows": len(df),
        "columns": len(df.columns),
        "numeric_columns": numeric_cols,
        "categorical_columns": categorical_cols,
        "date_columns": date_cols,
        "statistics": stats
    }
    
    return summary, charts
