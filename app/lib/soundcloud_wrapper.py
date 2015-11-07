import soundcloud

CLIENT_ID = "7921c0dd61fa35f72f121c2093db0992"
IMPT_FIELDS_RESOURCE = ['title', 'user', 'playback_count', 'created_at', 'favoritings_count', 'stream_url', 'download_url']

client = soundcloud.Client(client_id=CLIENT_ID)

## FIlTER BY STREAMABLE
def getTracksForQuery(query):
    tracks = client.get('/tracks', q=query, license='cc-by-sa')
    return tracks

def getPlaylistsForQuery(query, limit=5):
    print 'querying', query
    playlists = client.get('/playlists', q=query)
    limit_playlists = []
    for playlist in playlists:
        if len(limit_playlists) >= limit:
            return limit_playlists
        limit_playlists.append(playlist)
    return limit_playlists

def tracksToJson(tracks):
    json_arr = []
    for track in tracks:
        json_arr.append(trackToJson(track))
    return json_arr


def tracksJsonToMiniTracksJson(tracks_json):
    for track_json in tracks_json:
        trackJsonToMiniTrackJson(track_json)

def trackJsonToMiniTrackJson(track_json):
    pass




def trackToJson(track):
    return {
                # 'artist':track.label_name,
                # 'release_info': {
                #     'year': track.release_year,
                #     'month': track.release_month
                # },
                'name': track.title,
                'stream_url': track.stream_url + '?client_id=' + CLIENT_ID ,
                # 'download_url': track.download_url + '?client_id=' + CLIENT_ID,
                'tags': track.tag_list.split(" "),
                'track_type': track.track_type,
                'length': {
                    'minutes': 0,
                    'seconds': 0,
                    'total_seconds': 0,
                    'milliseconds': track.duration
                },
                'album_url': track.artwork_url,
                'hearts': track.favoritings_count,
                'total_plays': track.playback_count,
                'genre': track.genre
            }

# Takes stream URI and returns stream
def streamToStreamURI(stream_url):
    return client.get(stream_url, allow_redirects=False).url

def downloadToDownloadURL(download_url):
    return client.get(download_url, allow_redirects=False).url

def getTopPlaylistsFromQuery(song_name=None, artist_name=None):
    if song_name and not artist_name:
        return getPlaylistsForQuery(song_name, limit=1)
    if artist_name and not song_name:
        return getPlaylistsForQuery(artist_name, limit=1)
    if artist_name and song_name:
        return getPlaylistsForQuery(artist_name + ' ' +  song_name, limit=1)

def uSoundCloudGetPlaylistQuery(song_name, artist_name):
    playlists = getTopPlaylistsFromQuery(song_name=None, artist_name=artist_name)
    for playlist in playlists:
        return playlist.tracks


# {
#         'song': {
#             'artist': 'Backstreet Boys',
#             'name': 'Larger than life',
#             'length': {
#                 'minutes': 3 [int],
#                 'seconds':  34 [int],
#                 'total_seconds': 843 [int]
#             },
#             'providers': [
#                 {
#                     'name': 'soundcloud',
#                     'quality': 0 [int] ### (0 = low - lesser than 192kbps, 1=medium - lesser than 320 until 192, 2 = high - 320 or greater),
#                     'stream_url': "http: ..."",
#                     "provider_image": http:// .com./..../...svg
#                 },
#                 {
#                     'name': 'youtube',
#                     "quality": '',
#                     "provider_image": http:// .com./..../...svg,
#                     "stream_url"
#                 }
#             ]
#         }
#         'provider': 'soundcloud',
#         'stream_url': 'http://
#     }

from pprint import pprint
tracks_json = uSoundCloudGetPlaylistQuery(song_name='drill time', artist_name='slim jesus')
pprint(tracks_json)
print
print len(tracks_json), 'found'

