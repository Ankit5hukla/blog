import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import DataTable from 'react-data-table-component'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { TITLE_UPDATE, TOKEN_EXPIRED } from 'src/constants/actions'
import { formatDate } from 'src/helpers/Utils'

const Blogs = ({ match, history }) => {
  const pageTitle = 'My Blogs',
    staleTime = 30000,
    {
      appStore: { apiURL, user },
      updateAppStore,
    } = useContext(AppContext),
    fetchPosts = async ({ queryKey: [userId] }) =>
      axios({
        method: 'get',
        url: `${apiURL}/post/user/${userId}`,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }).catch(error => {
        if (error.response) {
          error.response.status === 504 &&
            updateAppStore({
              type: TOKEN_EXPIRED,
              payload: {
                history,
                error: {
                  code: TOKEN_EXPIRED,
                  color: 'warning',
                  message: error.response.data.error,
                },
              },
            })
        }
      }),
    { isLoading, data, isError, error } = useQuery(
      [user?.user._id, 'all-posts'],
      fetchPosts,
      {
        // cacheTime: 5000,
        // refetchOnMount: false,
        // retry: false,
        staleTime,
        select: data => data?.data,
      }
    ),
    columns = [
      {
        id: 'title',
        name: 'Blog Title',
        grow: 4,
        cell: row => <Link to={`/admin/edit/${row._id}`}>{row.title}</Link>,
      },
      {
        id: 'createdAt',
        name: 'Created At',
        grow: 2,
        cell: row =>
          formatDate(new Date(row.createdAt), 'MMM dd, yyyy hh:mm aa'),
      },
      {
        id: 'status',
        name: 'Status',
        cell: () => 'Published',
      },
      {
        id: 'order',
        name: 'Order',
        cell: (_, i) => i + 1,
      },
      {
        id: 'action',
        name: 'Action',
        cell: row => (
          <>
            <Link
              to={`/admin/edit/${row._id}`}
              className={'btn btn-admin text-decoration-none me-2'}
            >
              Edit
            </Link>
            <Button
              variant={'danger'}
              onClick={() => {
                console.log('deleting', row._id)
              }}
            >
              Delete
            </Button>
          </>
        ),
      },
    ]

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: pageTitle,
      },
    })
  }, [updateAppStore])

  !false && console.log(data)

  if (isLoading) {
    return (
      <div
        className={'spinner-border spinner-border-sm text-light'}
        role={'status'}
      >
        <span className={'visually-hidden'}>Loading...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={`toast align-items-center text-white bg-danger border-0 show py-3 px-4`}
        role={'alert'}
        aria-live={'assertive'}
        aria-atomic={'true'}
      >
        {error.message}
      </div>
    )
  }

  return (
    <div className={'card my-4 p-3'}>
      <h4>Blogs Listing</h4>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Blogs
