def return_idx_adjacent_to(line_idx, char_idx, f)
  new_arr = []
  new_arr << [line_idx - 1, char_idx] unless line_idx < 0# North
  new_arr << [line_idx + 1, char_idx] unless line_idx >= f.size - 1# South
  new_arr << [line_idx, char_idx - 1] unless char_idx < 0# West
  new_arr << [line_idx, char_idx + 1] unless char_idx >= f[0].length - 1# East
  new_arr
end

def valid_pipe?(position, start_position, f, last_diff=nil)
  pipe_line_idx, pipe_char_idx = position
  new_pipe = f[pipe_line_idx][pipe_char_idx]

  start_line_idx, start_char_idx = start_position

  diff_position = [start_line_idx - pipe_line_idx, start_char_idx - pipe_char_idx]

  PIPE_TYPES[new_pipe].any? do |pipe_ends|
    pipe_ends == diff_position
  end
end

def find_last_index_of(regex, line)
  reverse_idx = (regex =~ line.chars.reverse.join)
  return nil if reverse_idx.nil?
  (line.length - 1) - reverse_idx
end

def pipe?(char)
  PIPE_TYPES.keys.include?(char)
end

f = File.new('texts/puzzle_10.txt').read
f = f.split("\n")

PIPE_TO_LETTER = {
  'S' => 'a',
  '|' => 'b',
  'L' => 'c',
  '-' => 'd',
  'J' => 'e',
  '7' => 'f',
  'F' => 'g'
}

PIPE_TYPES = {
  'S' => [[-1, 0], [1, 0], [0, -1], [0, 1]],
  '|' => [[-1, 0], [1, 0]],
  'L' => [[-1, 0], [0, 1]],
  '-' => [[0, -1], [0, 1]],
  'J' => [[0, -1], [-1, 0]],
  '7' => [[0, -1], [1, 0]],
  'F' => [[0, 1], [1, 0]]
}

pipe_seq = 0

start_line_idx = 0
start_char_idx = 0
adjacent_pipes = 0

f.each_with_index do |line, line_idx|
  if line.index('S')
    s_line_idx = line_idx
    s_char_idx = line.index('S')

    start_line_idx = s_line_idx
    start_char_idx = s_char_idx

    adjacent_pipes = return_idx_adjacent_to(s_line_idx, s_char_idx, f)

    adjacent_pipes.select! do |position|
      iter_line_idx, iter_char_idx = position
      f[iter_line_idx][iter_char_idx]  != '.' && valid_pipe?(position, [s_line_idx, s_char_idx], f)
    end

    f[s_line_idx][s_char_idx] = 'a'
  end
end

last_location = [[start_line_idx, start_char_idx], [start_line_idx, start_char_idx]]
current_pipes = adjacent_pipes

while !current_pipes.empty? && !current_pipes.any? { |pipe_location| current_pipes.count(pipe_location) >= 2 }
  pipe_seq += 1
  new_current_pipes = []

  last_location_idx = 0
  current_pipes.each do |location|
    start_line_idx, start_char_idx = location

    adjacent_pipes = return_idx_adjacent_to(start_line_idx, start_char_idx, f)
    beggining_of_pipe = last_location[last_location_idx]

    current_pipe = f[start_line_idx][start_char_idx]
    last_diff = [beggining_of_pipe[0] - start_line_idx, beggining_of_pipe[1] - start_char_idx]
    
    last_location[last_location_idx] = location

    next if /[a-z]/.match?(current_pipe)

    new_line_diff, new_char_diff = PIPE_TYPES[current_pipe].reject { |location| location == last_diff }.flatten

    new_location = [start_line_idx + new_line_diff, start_char_idx + new_char_diff]
    new_line_idx, new_char_idx = new_location

    if f[new_line_idx][new_char_idx] != '.' && valid_pipe?(location, new_location, f)
      new_current_pipes << [start_line_idx + new_line_diff, start_char_idx + new_char_diff]
    end

    last_location_idx += 1
  end

  current_pipes.each do |location|
    line_idx, char_idx = location
    f[line_idx][char_idx] = PIPE_TO_LETTER[f[line_idx][char_idx]]    
  end

  current_pipes = new_current_pipes
end

p (pipe_seq += 1)

new_f = f.map do |line|
  first_boundary = line.index(/[a-z]/)
  last_boundary = find_last_index_of(/[a-z]/, line)

  if first_boundary
    left = line[0...first_boundary].chars.map { |_| 'O' }.join
    right = line[last_boundary + 1..].chars.map { |_| 'O' }.join
    left + line[first_boundary..last_boundary] + right
  elsif !/[a-z]/.match?(line)
    line.chars.map { |_| 'O' }.join
  else
    line
  end
end

new_f.map! do |line|
  line.chars.map do |char| 
    if PIPE_TO_LETTER.values.include?(char)
      PIPE_TO_LETTER.select { |pipe, v| v == char }.keys[0]
    else
      char
    end
  end.join
end

loop do 
  f = new_f

  line_idx = 0
  new_f.each do |line|
    line.chars.each_with_index do |char, char_idx|
      if char == '.'
        adjacent_idxs = return_idx_adjacent_to(line_idx, char_idx, new_f)
        new_f[line_idx][char_idx] = 'O' if adjacent_idxs.any? do |adj_idxs| 
                                          adj_line_idx, adj_char_idx = adj_idxs
                                          new_f[adj_line_idx][adj_char_idx] == 'O'
                                        end
      end
    end

    line_idx += 1
  end

  break if new_f == f
end

p f

# SOLUTION PART 1

# def return_idx_adjacent_to(line_idx, char_idx, f)
#   new_arr = []
#   new_arr << [line_idx - 1, char_idx] unless line_idx < 0# North
#   new_arr << [line_idx + 1, char_idx] unless line_idx >= f.size - 1# South
#   new_arr << [line_idx, char_idx - 1] unless char_idx < 0# West
#   new_arr << [line_idx, char_idx + 1] unless char_idx >= f[0].length - 1# East
#   new_arr
# end

# def valid_pipe?(position, start_position, f, last_diff=nil)
#   pipe_line_idx, pipe_char_idx = position
#   new_pipe = f[pipe_line_idx][pipe_char_idx]

#   start_line_idx, start_char_idx = start_position

#   diff_position = [start_line_idx - pipe_line_idx, start_char_idx - pipe_char_idx]

#   PIPE_TYPES[new_pipe].any? do |pipe_ends|
#     pipe_ends == diff_position
#   end
# end

# f = File.new('texts/puzzle_10.txt').read
# f = f.split("\n")

# PIPE_TO_LETTER = {
#   'S' => 'a',
#   '|' => 'b',
#   'L' => 'c',
#   '-' => 'd',
#   'J' => 'e',
#   '7' => 'f',
#   'F' => 'g'
# }

# PIPE_TYPES = {
#   'S' => [[-1, 0], [1, 0], [0, -1], [0, 1]],
#   '|' => [[-1, 0], [1, 0]],
#   'L' => [[-1, 0], [0, 1]],
#   '-' => [[0, -1], [0, 1]],
#   'J' => [[0, -1], [-1, 0]],
#   '7' => [[0, -1], [1, 0]],
#   'F' => [[0, 1], [1, 0]]
# }

# pipe_seq = 0

# start_line_idx = 0
# start_char_idx = 0
# adjacent_pipes = 0

# f.each_with_index do |line, line_idx|
#   if line.index('S')
#     s_line_idx = line_idx
#     s_char_idx = line.index('S')

#     start_line_idx = s_line_idx
#     start_char_idx = s_char_idx

#     adjacent_pipes = return_idx_adjacent_to(s_line_idx, s_char_idx, f)

#     adjacent_pipes.select! do |position|
#       iter_line_idx, iter_char_idx = position
#       f[iter_line_idx][iter_char_idx]  != '.' && valid_pipe?(position, [s_line_idx, s_char_idx], f)
#     end

#     f[s_line_idx][s_char_idx] = 'a'
#   end
# end

# last_location = [[start_line_idx, start_char_idx], [start_line_idx, start_char_idx]]
# current_pipes = adjacent_pipes

# while !current_pipes.empty? && !current_pipes.any? { |pipe_location| current_pipes.count(pipe_location) >= 2 }
#   pipe_seq += 1
#   new_current_pipes = []

#   last_location_idx = 0
#   current_pipes.each do |location|
#     start_line_idx, start_char_idx = location

#     adjacent_pipes = return_idx_adjacent_to(start_line_idx, start_char_idx, f)
#     beggining_of_pipe = last_location[last_location_idx]

#     current_pipe = f[start_line_idx][start_char_idx]
#     last_diff = [beggining_of_pipe[0] - start_line_idx, beggining_of_pipe[1] - start_char_idx]
    
#     last_location[last_location_idx] = location

#     next if /[a-z]/.match?(current_pipe)

#     new_line_diff, new_char_diff = PIPE_TYPES[current_pipe].reject { |location| location == last_diff }.flatten

#     new_location = [start_line_idx + new_line_diff, start_char_idx + new_char_diff]
#     new_line_idx, new_char_idx = new_location

#     if f[new_line_idx][new_char_idx] != '.' && valid_pipe?(location, new_location, f)
#       new_current_pipes << [start_line_idx + new_line_diff, start_char_idx + new_char_diff]
#     end

#     last_location_idx += 1
#   end

#   current_pipes.each do |location|
#     line_idx, char_idx = location
#     f[line_idx][char_idx] = PIPE_TO_LETTER[f[line_idx][char_idx]]    
#   end

#   current_pipes = new_current_pipes
# end

# p (pipe_seq += 1)