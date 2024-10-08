// material-ui
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

// ==============================|| SKELETON - EARNING CARD ||============================== //

const CategorySkeleton = () => (
  <>
    {/* <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Skeleton height={25} width={200} />} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" height={56} animation="wave" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" height={56} animation="wave" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid> */}
    {/* <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        <Grid container justifyContent={'space-between'}>
          <Grid item xs={12} sm={3}>
            <Skeleton variant="rounded" height={50} width={410} animation="wave" />
          </Grid>
          <Grid item display={'flex'} justifyContent={'flex-end'} xs={12} sm={3}>
            <Skeleton variant="rounded" height={40} width={150} animation="wave" />
          </Grid>
        </Grid>
      </Grid>
    </Grid> */}
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Skeleton variant="rectangular" width={44} height={44} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={34} height={34} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" height={30} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default CategorySkeleton;
