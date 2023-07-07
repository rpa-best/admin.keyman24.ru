/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Form } from 'react-router-dom'

export default function UpdateForm({
    columns,
    row,
}: {
    columns?: any
    row?: any
}) {
    const [tempRow, setTempRow] = useState(row)

    return (
        <Form method='post' action={`/org/${tempRow.id}/edit`}>
            {/* <label>
                Title:
                <input type='text' name='title' defaultValue={title} />
            </label>
            <label>
                Body:
                <input type='text' name='body' defaultValue={body} />
            </label>
            <input type='hidden' name='userId' value={userId} />
            <input type='hidden' name='id' value={id} />
            <input type='submit' value='Update post' disabled={submitting} /> */}
            <div>
                {columns.map((column: any, index: number) => (
                    <div style={{ marginBottom: '24px' }} key={index}>
                        <h3>{column.Header}</h3>
                        <input
                            type='text'
                            // readOnly={mode === 'read'}
                            defaultValue={tempRow[column.accessor]}
                            // onChange={handleEdit.bind(null, column)}
                        />
                    </div>
                ))}
            </div>
        </Form>
    )
}
